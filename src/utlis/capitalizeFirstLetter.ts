export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toLocaleUpperCase() + string.toLocaleLowerCase().slice(1);
};