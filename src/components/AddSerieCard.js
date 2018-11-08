import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity }  from 'react-native';

const AddSerieCard = ({ serie, isFirstColumn, onNavigate }) => (
    <TouchableOpacity 
        onPress={onNavigate}
        style={[
        styles.container, 
        isFirstColumn ? styles.firstColumn : styles.lastColumn]}>
        <View style={styles.card}>
            <Image
                source={require('../../resources/add.png')}
                style={styles.image}
            />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		// Solução 2
		//flex: .5,

		// Solução 1
		width: '50%',
		padding: 5,
        height: Dimensions.get('window').width / 2,
        //height: 200

		// borderWidth: 1,
		// borderColor: 'blue',
	},
	card: {
		flex: 1,
		//borderWidth: 1,

		// Solução 2
		// margin: 10
	},
	image: {
		width: '100%',
		height: '100%'
	},
	firstColumn: {
		paddingLeft: 10
	},
	lastColumn: {
		paddingRight: 10
	}
});

export default AddSerieCard;