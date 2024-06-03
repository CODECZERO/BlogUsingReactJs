import React, { useId } from 'react';

const Input =React.forwardRef(function Input({
    type = "text",
    label,
    className,
    defaultValue,
    ...props
}, ref) {
    const id = useId();
    return (
        <>
            <div className="mb-6">
                <label htmlFor={`${label}`} className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}>{label}</label>
                <input type={`${type}`} id={id} defaultValue={defaultValue} {...props}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                ${className}`} ref={ref} />
            </div>
        </>
    )
})


export default Input;