import React from 'react'

const Checkbox = ({title,state,onChange,key}) => {
    return (
        <div key={key} className="checkbox-item">
            <div className="column">
                <input
                    type="checkbox"
                    checked={state}
                    onChange={onChange}
                />
            </div>
            <div className="column">
                <label htmlFor="">{title}</label>
            </div>
        </div>
    )
}

export default Checkbox
