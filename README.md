# Eng
## About
This game is the result of participating in 2 days game jam.

## Getting started
### Easy way to start
* go to `/game` folder
* open `index.html` file
### If you want to play around with the codebase
Do next commands in your terminal:
```bash
$ yarn
$ yarn start
```

## Controls
* Player 1 (red):
  * Movement: arrow keys
  * Fire: Enter

* Player 2 (green):
  * Movement: WASD
  * Fire: T

## Rules
### Shoot and being shot
You have 7 bullets which you can use to hit the enemy.
Every time you hit another player you loose one bullet and you shrink a bit.
Also with loosing extra weight you're getting faster!

Every time you got shot your size increases, you're getting slower, but you also get 1 extra bullet!

### Shooting rules
Every bullet reloads separately, it takes 8 second.
e.g. you have 7 bullets you can either shoot them one by one
and then wait for 8 seconds until they are reloaded,
or you can shoot them with a 1 second pause - then you don't need to wait for reloading
(the first one will be reloaded when you shoot the last one)
Another example: you have only one bullet, then you can't shoot faster then one shot per 8 seconds

### Goal
Your goal is get small enough to be able to escape out of game field and then escape!

# Rus
## Управление

* Управление для красного игрока:
  * Движение - клавиши курсора
  * Огонь - Enter
* Управление для зеленого игрока:
  * Движение - клавиши AWSD
  * Огонь - клавиша T

## Цель

Уменьшится до размеров, позволяющих покинуть игровое поле через ворота.

## Средства

Первоначальный запас снарядов - 7 штук (восполняется при промахе). Из него же складывается размер игрока. Каждое попадание в соперника уменьшает Ваш размер и увеличивает размер соперника вместе с его боезапасом.