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

  return (
    <div className="mb-8 p-4 bg-blue-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Tax & Service Fee Settings
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Rate (%)
          </label>

          <TextInput
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
            placeholder="Tax Rate (%)"
            step="0.1"
            min={0}
            max={100}
            className="mt-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Fee (%)
          </label>

          <TextInput
            type="number"
            value={serviceFeeRate}
            onChange={(e) => setServiceFeeRate(parseFloat(e.target.value) || 0)}
            placeholder="Service Fee (%)"
            step="0.1"
            min={0}
            max={100}
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
                <span>Tax ({taxRate}%):</span>
                <span>${totalTax.toFixed(2)}</span>
              </div>
            )}
            {serviceFeeRate > 0 && (
              <div className="flex justify-between">
                <span>Service Fee ({serviceFeeRate}%):</span>
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
