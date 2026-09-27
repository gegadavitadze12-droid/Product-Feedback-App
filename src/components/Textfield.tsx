'use client'

interface TextfieldProps {
    errors?: any
}

export function Textfield(props: TextfieldProps) {
    const {errors} = props
    return (
        <>
            <input 
                type="text"
                className="w-full h-[48] rounded-[0.3125rem] py-[13px] px-[24px] mb-[0.25rem] font-normal text-[0.9375rem] leading-[1.375rem] text-dark-1" 
            />
            { errors && 
               <p className="font-normal text-[0.875rem] leading-[1.25rem] text-red"> Yo an eror</p>
            }
        </>
    )
}