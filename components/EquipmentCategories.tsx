'use client'

interface EquipmentCategory {
  name: string
  iconColor: string
}

const equipmentCategories: EquipmentCategory[] = [
  { name: 'Skid steers', iconColor: 'bg-yellow-400' },
  { name: 'Bulldozers', iconColor: 'bg-yellow-400' },
  { name: 'Excavators', iconColor: 'bg-yellow-400' },
  { name: 'Compacts', iconColor: 'bg-yellow-400' },
  { name: 'Wheel loaders', iconColor: 'bg-yellow-400' },
  { name: 'Backhoes', iconColor: 'bg-yellow-400' },
  { name: 'Bucket trucks', iconColor: 'bg-white' },
  { name: 'Telehandlers', iconColor: 'bg-yellow-400' },
  { name: 'Dump trucks', iconColor: 'bg-green-500' },
  { name: 'Forklifts', iconColor: 'bg-yellow-400' },
]

// Simple equipment icon component - stylized representation
const EquipmentIcon = ({ color }: { color: string }) => {
  return (
    <div
      className={`${color} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-2 border-2 border-gray-300`}
    >
      <svg
        viewBox="0 0 40 40"
        fill="currentColor"
        className="w-10 h-10 text-gray-800"
      >
        <rect x="5" y="15" width="30" height="20" rx="2" />
        <rect x="8" y="18" width="8" height="8" />
        <rect x="24" y="18" width="8" height="8" />
        <rect x="12" y="28" width="16" height="4" />
        <circle cx="12" cy="35" r="3" />
        <circle cx="28" cy="35" r="3" />
      </svg>
    </div>
  )
}

export default function EquipmentCategories() {
  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {equipmentCategories.map((category) => (
            <button
              key={category.name}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-orange-400 hover:bg-orange-50 hover:shadow-sm transition-all text-center group"
            >
              <EquipmentIcon color={category.iconColor} />
              <p className="text-sm font-medium text-gray-700 mt-2 group-hover:text-gray-900">
                {category.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
