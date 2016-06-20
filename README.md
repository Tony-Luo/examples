# examples

This branch is for Ionic examples

This Ionic example is a hybrid app game.

Home page has five images

![](https://github.com/Tony-Luo/examples/blob/dev-ionic/demo/1.png)

Click each image will open an Ionic modal

![](https://github.com/Tony-Luo/examples/blob/dev-ionic/demo/2.png)

Click button will go to next page, using Ionic built-in AngularUI ui-router. There are 5 planes, 1 bomber in center and 4 fighters around it. Top are score, name of user and timer.

![](https://github.com/Tony-Luo/examples/blob/dev-ionic/demo/3.png)

4 fighters have their own direction. User should swipe to the same direction as direction of fighter in order to shoot it down. For example, fighters toward top can be shot down by swiping to top. This event is handled by Ionic onSwipeUp listener. Shooting down plane will receive scores.

![](https://github.com/Tony-Luo/examples/blob/dev-ionic/demo/4.png)

When shoot down all 4 fighters, user should double tap central bomber. This event is handled by Ionic onDoubleTap listener.

![](https://github.com/Tony-Luo/examples/blob/dev-ionic/demo/5.png)

After 5 planes are shot down, map will be refreshed and another 5 planes are created.

![](https://github.com/Tony-Luo/examples/blob/dev-ionic/demo/6.png)

When timer end, Ionic alert will popup, displaying some greetings and privde a button to next page.

![](https://github.com/Tony-Luo/examples/blob/dev-ionic/demo/7.png)

This game has not been completed yet. User login, ranking page and another game will be added.

These pictures are from Ionic browser testing (by running _ionic serve_ command)
