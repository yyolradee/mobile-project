export const TOGGLE_SEARCH = "TOGGLE_SEARCH";

export const toggleSearch = (searchIsVisible) => {
    return { type: TOGGLE_SEARCH, payload: searchIsVisible};
   };