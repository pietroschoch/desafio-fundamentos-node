import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeValue = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(income => income.value)
      .reduce((total, income) => total + income, 0);

    const outcomeValue = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(outcome => outcome.value)
      .reduce((total, outcome) => total + outcome, 0);

    const balance = {
      income: incomeValue,
      outcome: outcomeValue,
      total: incomeValue - outcomeValue,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
