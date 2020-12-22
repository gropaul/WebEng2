let initialState = {wikiInfoShown: "NOT_SHOWN"};

function wikiInfo(state = initialState,action){
   if (action.type == "SHOW_WIKI_INFO"){
      state = { ...state, wikiInfoShown: "SHOWN"};

      //TODO: Komponente starten und anzeigen
      return state;
   }
  
   if(action.type == "CLOSE_WIKI_INFO"){
      state = {...state, wikiInfoShown: "NOT_SHOWN"};
      
      //TODO: Komponente schließen
      return state;
  }  
  return state;
}

export default wikiInfo;