export const capitalizeFirstLetter = (string?: string): string => {
    if (string)
        return string.charAt(0).toLocaleUpperCase() + string.toLocaleLowerCase().slice(1);
    return '';
};