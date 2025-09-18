// Color mapping composable for consistent theming across components
export default function useColorMapping() {
    const colorMap = {
        blue: {
            gradient: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-500',
            bgLight: 'bg-blue-100 dark:bg-blue-900/30',
            text: 'text-blue-800 dark:text-blue-300',
            textAccent: 'text-blue-600 dark:text-blue-400',
            hover: 'bg-blue-600 hover:bg-blue-700'
        },
        green: {
            gradient: 'from-green-500 to-green-600',
            bg: 'bg-green-500',
            bgLight: 'bg-green-100 dark:bg-green-900/30',
            text: 'text-green-800 dark:text-green-300',
            textAccent: 'text-green-600 dark:text-green-400',
            hover: 'bg-green-600 hover:bg-green-700'
        },
        purple: {
            gradient: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-500',
            bgLight: 'bg-purple-100 dark:bg-purple-900/30',
            text: 'text-purple-800 dark:text-purple-300',
            textAccent: 'text-purple-600 dark:text-purple-400',
            hover: 'bg-purple-600 hover:bg-purple-700'
        },
        orange: {
            gradient: 'from-orange-500 to-orange-600',
            bg: 'bg-orange-500',
            bgLight: 'bg-orange-100 dark:bg-orange-900/30',
            text: 'text-orange-800 dark:text-orange-300',
            textAccent: 'text-orange-600 dark:text-orange-400',
            hover: 'bg-orange-600 hover:bg-orange-700'
        },
        red: {
            gradient: 'from-red-500 to-red-600',
            bg: 'bg-red-500',
            bgLight: 'bg-red-100 dark:bg-red-900/30',
            text: 'text-red-800 dark:text-red-300',
            textAccent: 'text-red-600 dark:text-red-400',
            hover: 'bg-red-600 hover:bg-red-700'
        },
        emerald: {
            gradient: 'from-emerald-500 to-emerald-600',
            bg: 'bg-emerald-500',
            bgLight: 'bg-emerald-100 dark:bg-emerald-900/30',
            text: 'text-emerald-800 dark:text-emerald-300',
            textAccent: 'text-emerald-600 dark:text-emerald-400',
            hover: 'bg-emerald-600 hover:bg-emerald-700'
        }
    } as const

    const getColorClasses = (color: string) => {
        return (colorMap as any)[color] || colorMap.blue
    }

    return {
        colorMap,
        getColorClasses
    }
}