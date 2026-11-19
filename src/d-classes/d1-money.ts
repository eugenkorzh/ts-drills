export type Currency = "UAH" | "USD";

export class Money {
    private constructor(readonly cents: number, readonly currency: Currency) {}

    static of(amount: number, currency: Currency): Money {
      if (!Number.isFinite(amount)) {
        throw new RangeError("amount must be finite Number");
      }
      const afterDecimal = amount.toString().split('.')[1] || '';
      
      if (afterDecimal.length > 2) {
        throw new RangeError("no more than 2 signs after decimal point");
      }
      
      return new Money(Math.round(amount * 100), currency);
    }

    add(other: Money): Money {
      if (this.currency !== other.currency) {
        throw new Error("Currency must be the same");
      }

      return new Money(this.cents + other.cents, this.currency);
    }

    equals(other: Money): boolean {
      return this.cents === other.cents && this.currency === other.currency
    }

    format(): string {
      return (this.cents / 100).toFixed(2) + ' ' + this.currency;
    }

}