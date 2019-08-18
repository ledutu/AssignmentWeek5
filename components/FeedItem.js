import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default class FeedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onPressReadMore = () => {
        const { item: { url } } = this.props;
        Linking.openURL(url).catch(err => console.log('object'))
    }

    render() {

        const { item: { title, urlToImage, source, publishedAt, content },
        } = this.props
        return (
            <View style = {styles.card}>
                <Text style={styles.titleText}>{title}</Text>
                <Image source={{ uri: urlToImage }} style={styles.image} />
                <Text><Text style = {styles.source}>Source: </Text>{source.name}</Text>
                <Text style = {styles.contentText} numberOfLines={3}>{content}</Text>
                <Text><Text style= {styles.source}>PubLished: </Text>{publishedAt}</Text>
                <TouchableOpacity
                    onPress={this.onPressReadMore}
                    style={styles.button}
                >
                    <Text style = {styles.readText}>Read More</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    source:{
        fontWeight: 'bold'
    },
    card: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        justifyContent: "space-around"
    },

    image: {
        width: 400,
        height: 200,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    readText:
    {
        color: 'white',
        fontSize: 20,
    },
    contentText: {
    },
    titleText:{
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
    }
})
