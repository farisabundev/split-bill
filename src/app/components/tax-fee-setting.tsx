import { useState } from "react";
import { TextInput } from "./text-input";

type TaxFeeSettingProps = {
  taxRate: number;
  setTaxRate: (rate: number) => void;
  serviceFeeRate: number;
  setServiceFeeRate: (rate: number) => void;
  totalExpenses: number;
  totalTax: number;
  totalServiceFee: number;
  grandTotal: number;
};

export const TaxFeeSetting = (props: TaxFeeSettingProps) => {
  const {
    taxRate,
    setTaxRate,
    serviceFeeRate,
    setServiceFeeRate,
    totalExpenses,
    totalTax,
    totalServiceFee,
    grandTotal,
  } = props;

  const [isTaxFixed, setIsTaxFixed] = useState(false);
  const [isServiceFeeFixed, setIsServiceFeeFixed] = useState(false);

  return (
    <div className="mb-8 p-4 bg-blue-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Tax & Service Fee Settings
      </h3>

      <div className="flex gap-6 mb-4">
        <label className="flex items-center text-sm cursor-pointer">
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isTaxFixed ? "bg-blue-600" : "bg-gray-300"
              }`}
            onClick={() => setIsTaxFixed(!isTaxFixed)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isTaxFixed ? "translate-x-6" : "translate-x-1"
                }`}
            />
          </div>
          <span className="ml-2">Tax as Fixed Amount</span>
        </label>

        <label className="flex items-center text-sm cursor-pointer">
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isServiceFeeFixed ? "bg-blue-600" : "bg-gray-300"
              }`}
            onClick={() => setIsServiceFeeFixed(!isServiceFeeFixed)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isServiceFeeFixed ? "translate-x-6" : "translate-x-1"
                }`}
            />
          </div>
          <span className="ml-2">Service Fee as Fixed Amount</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Rate ({isTaxFixed ? "Fixed" : "%"})
          </label>
          <TextInput
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
            placeholder={isTaxFixed ? "Tax Amount" : "Tax Rate (%)"}
            step="0.1"
            min={0}
            className="mt-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Fee ({isServiceFeeFixed ? "Fixed" : "%"})
          </label>
          <TextInput
            type="number"
            value={serviceFeeRate}
            onChange={(e) =>
              setServiceFeeRate(parseFloat(e.target.value) || 0)
            }
            placeholder={
              isServiceFeeFixed ? "Service Fee Amount" : "Service Fee (%)"
            }
            step="0.1"
            min={0}
            className="mt-2 w-full"
          />
        </div>
      </div>

      {(taxRate > 0 || serviceFeeRate > 0) && totalExpenses > 0 && (
        <div className="mt-4 p-3 bg-white rounded-lg border">
          <div className="text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalExpenses.toFixed(2)}</span>
            </div>
            {taxRate > 0 && (
              <div className="flex justify-between">
                <span>
                  Tax ({isTaxFixed ? "Fixed" : taxRate + "%"}):</span>
                <span>${totalTax.toFixed(2)}</span>
              </div>
            )}
            {serviceFeeRate > 0 && (
              <div className="flex justify-between">
                <span>
                  Service Fee (
                  {isServiceFeeFixed ? "Fixed" : serviceFeeRate + "%"}):</span>
                <span>${totalServiceFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-gray-800 border-t pt-2 mt-2">
              <span>Grand Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
