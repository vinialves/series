import firebase from 'firebase';

export const SET_WHOLE_SERIE = 'SET_WHOLE_SERIE';
export const setWholeSerie = serie => ({
    type: SET_WHOLE_SERIE,
    serie
});

export const SET_FIELD = 'SET_FIELD';
export const setField = (field, value) => {
    return {
        type: SET_FIELD,
        field,
        value,
    }
};

export const SERIE_SAVED_SUCCESS = 'SERIE_SAVED_SUCCESS';
export const serieSavedSuccess = () => ({
    type: SERIE_SAVED_SUCCESS
})

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
    type: RESET_FORM
})

export const saveSerie = (serie) => {
    const {currentUser} = firebase.auth();
    return async dispatch => {
        //console.log('começou aqui');
        //await delay(1000);
        //console.log('1s se passou');
        //throw new Error('nosso erro personalizado');
        
        const db = firebase.database();

        if (serie.id){
            //update da serie
            await db.ref(`users/${currentUser.uid}/series/${serie.id}`)
                .set(serie);
        }else{
            //criar a serie
            await db.ref(`users/${currentUser.uid}/series`)
                .push(serie);
        }
        //console.log('firebase salvou');
        dispatch(serieSavedSuccess());
    }
};

//const delay = ms => new Promise ((resolve, reject) =>{
//    setTimeout(() => resolve(), ms)
//})
//delay(2000).then(() => console.log('esperou por 2s'))

