import React from 'react';
import { 
    ScrollView, 
    StyleSheet, 
    Image,
    Button,
    View 
}  from 'react-native';

import Line from '../components/Line';
import LongText from '../components/LongText';

import {connect} from 'react-redux';
import { deleteSerie  } from '../actions';

class SerieDetailPage extends React.Component {
    render(){
        const { navigation } = this.props;
        const { serie } = navigation.state.params;

        return (
            <ScrollView>
                {
                    serie.img
                    ? <Image 
                        style={styles.image}
                        source={{
                            uri: serie.img
                    }}/>
                    : null
                }
                <Line label="Título" content={serie.title} />
                <Line label="Gênero" content={serie.gender} />
                <Line label="Nota" content={serie.rate} />
                <LongText label="Descrição" content={serie.description} />
                
                <View style={styles.button}>
                    <Button 
                        title="Editar"
                        onPress={() => {
                            navigation.replace('SerieForm', {serieToEdit: serie});
                        }}
                    />
                </View>

                <View style={styles.button}>
                    <Button 
                        title="Deletar"
                        color="#FF0004FF"
                        onPress={async () => {
                            //console.log('deletando a serie');
                            const hasDeleted = await this.props.deleteSerie(serie);
                            if(hasDeleted){
                                navigation.goBack();
                            }
                        }}
                    />
                </View>                

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1
    },
    button: {
        margin: 10
    }

});

export default connect(null, { deleteSerie })(SerieDetailPage);