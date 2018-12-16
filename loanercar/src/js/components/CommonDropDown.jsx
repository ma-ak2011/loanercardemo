import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


export const CommonDropDown = ({ value, list, defaultValue = "0", labelText, inputId,
                                   onChange,
                                   fullWidth = false,
                                   disableUnderline = false,
                                   showLabel = true,
                                   required =false}) => {
    return (
        <div style={{display: "inline-block"}}>
            {showLabel
                ? <InputLabel htmlFor={inputId} required={required}>{labelText}</InputLabel>
                : false}

            <Select fullWidth={fullWidth} disableUnderline={disableUnderline}
                    value={value}
                    onChange={e => onChange(e)}
                    inputProps={{key: 'type', id: inputId}}>
                <MenuItem value={defaultValue}></MenuItem>
                {Array.isArray(list)
                    ? list.map((l, i) => <MenuItem key={i} value={l.value}>{l.key}</MenuItem>)
                    : Object.keys(list).map((k, i) => <MenuItem key={i} value={list[k].value}>{list[k].key}</MenuItem>)}
            </Select>
        </div>
    );
};