import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdFilterList, MdFilterListOff } from "react-icons/md";
import RenderInput from "../RenderInput/RenderInput";
import { FieldError } from "react-hook-form";

const FilterSearch: React.FC<{
    inputFields: {
        name: string;
        type: any;
        placeholder?: string;
        label?: string;
        required?: boolean;
        options?: any;
        error?: FieldError;
        gridClass?: string;
    }[];
    register: any;
    errors: any;
    onSubmit: () => void;
}> = ({ inputFields, register, errors, onSubmit }) => {
    const [collapse, setCollapse] = useState(false);

    return (
        <div className="bg-violet-100 mb-4 p-2.5">
            <div className="flex justify-between">
                <div className="font-semibold">Filter</div>
                <div
                    onClick={() => setCollapse((prev) => !prev)}
                    className="cursor-pointer"
                >
                    {collapse ? <MdFilterListOff /> : <MdFilterList />}
                </div>
            </div>

            {collapse && (
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {inputFields?.map((field, index) => (
                                <div key={index} className={`w-full ${field.gridClass} py-1`}>
                                    <RenderInput
                                        name={field.name}
                                        fieldType={field.type}
                                        placeholder={field.placeholder}
                                        label={field.label}
                                        required={field.required}
                                        options={field.options}
                                        register={register}
                                        error={errors[field.name]}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="flex text-sm items-center gap-2 bg-violet-500 text-white transition-colors hover:bg-violet-600 px-3 py-1.5 rounded"
                            >
                                <FiSearch /> <span>Search</span>
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default FilterSearch;
