import React from 'react';
import { Package, Pencil } from 'lucide-react';

interface ProductCardProps {
  name: string;
  stock_in: number;
  stock_out: number;
  status: string;
  day_left: number;
  caregory: string;
  image: string;
  onEdit?: (name: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  stock_in,
  stock_out,
  status,
  day_left,
  caregory,
  image,
  onEdit
}) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'critical':
        return 'bg-red-50 border-red-100';
      case 'low':
        return 'bg-orange-50 border-orange-100';
      case 'good':
        return 'bg-green-50 border-green-100';
      case 'high':
        return 'bg-blue-50 border-blue-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };

  const getStatusBadge = () => {
    switch (status.toLowerCase()) {
      case 'critical':
        return <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-600 rounded">Critical</span>;
      case 'low':
        return <span className="text-xs font-medium px-2 py-1 bg-orange-100 text-orange-600 rounded">Low</span>;
      case 'good':
        return <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-600 rounded">Good</span>;
      case 'high':
        return <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-600 rounded">High</span>;
      default:
        return null;
    }
  };

  const getIconColor = () => {
    switch (status.toLowerCase()) {
      case 'critical':
        return 'text-red-500 bg-red-100';
      case 'low':
        return 'text-orange-500 bg-orange-100';
      case 'good':
        return 'text-green-500 bg-green-100';
      case 'high':
        return 'text-blue-500 bg-blue-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  const getUnitColor = () => {
    switch (status.toLowerCase()) {
      case 'critical':
        return 'text-red-600';
      case 'low':
        return 'text-orange-600';
      case 'good':
        return 'text-green-600';
      case 'high':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border-2 ${getStatusColor()} hover:shadow-md transition-all`}>
      <div className="flex items-center gap-4 flex-1">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg ${getIconColor()} flex items-center justify-center shrink-0`}>
          <Package size={24} />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
            {getStatusBadge()}
          </div>
          <p className="text-sm text-gray-500">
            Stock In: {stock_in} | Stock Out: {stock_out} | Days Left: {day_left}
          </p>
        </div>
      </div>

      {/* Units and Edit */}
      <div className="flex items-center gap-3 ml-4">
        <div className="text-right">
          <p className={`text-2xl font-bold ${getUnitColor()}`}>{stock_in}</p>
          <p className="text-xs text-gray-500">UNITS</p>
        </div>
        
        <button
          onClick={() => onEdit?.(name)}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Pencil size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;