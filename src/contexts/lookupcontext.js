import React, { createContext, useContext, useEffect, useState } from 'react';

// UTILS
import ApiCall from '@/utils/Apicall';
import Constants from '@/utils/Constants';

export const LookupContext = createContext();

export const LookupProvider = (props) => {

  const [states, setStates] = useState([]);

  useEffect(() => {
    fetchStateList();
  }, [])

  async function fetchStateList() {
    const res = await ApiCall({
      url: Constants.API_ENDPOINTS.STATES_BY_CODE_LIST,
      method: "GET",
      withToken: false
    })

    if (Array.isArray(res) && res.length > 0) {
      setStates(res.map(state => ({ label: state.state_name, value: state.state_code })))
    }
  } 

  const value = {
    states,
    setStates,
  };

  return (
    <LookupContext.Provider value={value}>
      {props.children}
    </LookupContext.Provider>
  );
};

export const useLookupContext = () => useContext(LookupContext);

