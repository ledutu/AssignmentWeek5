import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import FeedItem from './components/FeedItem';
const URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe';

export default class App extends Component {
  state = {
    isLoading: true,
    listArticles: [],
    articlesCount: 0,
    page: 1,
    isRefreshing: false,
    onRefreshing: false,
  };



  componentDidMount = async () => {
    const { page } = this.state
    this.callAPI()
  }

  callAPI = async () => {
    const { listArticles, page } = this.state
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=2f07bc65d40743b5993686d87d605e64&page=${page}`);
    const jsonResponse = await response.json();
    if (page === 2) {
      this.setState({
        isLoading: false,
        listArticles: listArticles.concat(jsonResponse.articles),
        articlesCount: jsonResponse.totalResults,
        page: 1,
        onRefreshing: false,
      })
    }
    else {
      this.setState({
        isLoading: false,
        listArticles: listArticles.concat(jsonResponse.articles),
        articlesCount: jsonResponse.totalResults,
        page: page + 1,
        onRefreshing: false,
      })
    }
  }

  onEndReached = async () => {
    const { page, listArticles } = this.state;
    this.callAPI()
  }

  renderFooter = () => {
    const { isRefreshing } = this.state;
    if (!isRefreshing) {
      return <ActivityIndicator />
    }
  }

  renderItem = ({ item }) => {
    return <FeedItem item={item} />
  }

  onRefresh = async () => {
    await this.setState({
      onRefreshing: true,
      listArticles: [],
      page: 1,
      isLoading: false,
    })
    this.callAPI();
  }

  render() {
    const { listArticles, isLoading, articlesCount, onRefreshing } = this.state;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>

      )
    }
    return (
      <View style={styles.container}>
        <Text><Text style={styles.count}>ArticleCount: </Text> {articlesCount} </Text>
        <FlatList
          data={listArticles}
          renderItem={this.renderItem}
          contentContainerStyle={styles.flatList}
          onEndReached={this.onEndReached}
          keyExtractor={item => item.title}
          ListFooterComponent={this.renderFooter()}
          onRefresh={this.onRefresh}
          refreshing={onRefreshing}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  count:
  {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
