import 'dart:async';
import 'package:flutter_wordpress/flutter_wordpress.dart' as wp;
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Ideias Radicais',
      theme: new ThemeData(
        //scaffoldBackgroundColor: Colors.black,
        brightness: Brightness.dark,
        primarySwatch: Colors.yellow,
        bottomAppBarColor: Colors.yellowAccent,
        textTheme: TextTheme(
          body1: TextStyle(),
          body2: TextStyle(),
        ).apply(
          bodyColor: Colors.orange,
          displayColor: Colors.blue,
        ),
      ),
      home: new MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  wp.WordPress wordPress = wp.WordPress(
    
    baseUrl: 'http://rovann.com.br',
    //authenticator: wp.WordPressAuthenticator.ApplicationPasswords, //.WordPressAuthenticator.JWT,
    //adminName: '',
    //adminKey: '',
  );

  @override
  Widget build(BuildContext context) {
    var futureBuilder = new FutureBuilder(
      future: _getData(),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        switch (snapshot.connectionState) {
          case ConnectionState.none:
          case ConnectionState.waiting:
            //return new Text('loading...');
            return Center(
              child: new CircularProgressIndicator(
                backgroundColor: Colors.transparent,
                valueColor: AlwaysStoppedAnimation(Colors.yellow),
              ),
            );
          default:
            if (snapshot.hasError)
              return new Text('Error: ${snapshot.error}');
            else
              return createListView(context, snapshot);
        }
      },
    );

    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Artigos"),
      ),
      body: futureBuilder,
    );
  }

  Future<List<wp.Post>> _getData() async {
    return wordPress.fetchPosts(
      postParams: wp.ParamsPostList(
        context: wp.WordPressContext.view,
        pageNum: 1,
        perPage: 20,
        order: wp.Order.desc,
        orderBy: wp.PostOrderBy.date,
      ),
      fetchAuthor: true,
      fetchFeaturedMedia: true,
      fetchComments: true,
    );
  }

  Widget createListView(BuildContext context, AsyncSnapshot snapshot) {
    List<wp.Post> values = snapshot.data;
    return new ListView.builder(
      itemCount: values.length,
      itemBuilder: (BuildContext context, int index) {
        return new Column(
          children: <Widget>[
            new ListTile(
              title: new Text(values[index].title.rendered),
            ),
            new Divider(
              height: 2.0,
            ),
          ],
        );
      },
    );
  }
}
