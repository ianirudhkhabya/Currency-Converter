import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
  };

  const handleFromCurrencyChange = (currency) => {
    setFrom(currency);
  };

  const handleToCurrencyChange = (currency) => {
    setTo(currency);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    convert();
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat">
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={handleSubmit}>
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={handleAmountChange}
                onCurrencyChange={handleFromCurrencyChange}
                currencyOptions={options}
                selectedCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swapCurrencies}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                onCurrencyChange={handleToCurrencyChange}
                currencyOptions={options}
                selectedCurrency={to}
                amountDisabled={true}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
