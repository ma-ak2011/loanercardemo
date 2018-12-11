import React            from 'react';

export const Error = ({ visible, message }) => {

    const styles = {
        position: "relative",
        padding: ".75rem 1.25rem",
        marginBottom: "1rem",
        border: "1px solid transparent",
        borderRadius: ".25rem",
        color: "#721c24",
        backgroundColor: "#f8d7da",
        borderColor: "#f5c6cb"
    };

    const element = visible? <div style={styles}>{ message.join('\n') }</div>: false;
    return(element);
};