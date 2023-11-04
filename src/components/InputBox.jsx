import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) {
  const amountInputId = useId();

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    if (onAmountChange) {
      const numericValue = parseFloat(inputValue);
      if (!isNaN(numericValue) && numericValue >= 0) {
        onAmountChange(numericValue);
      }
    }
  };

  const handleCurrencyChange = (e) => {
    if (onCurrencyChange) {
      onCurrencyChange(e.target.value);
    }
  };

  return (
    <div className={`bg-white/70 p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-black mb-2 inline-block">
          {label}
        </label>
        <input
          type="number"
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          disabled={currencyDisabled}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
