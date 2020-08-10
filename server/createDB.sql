drop table if exists Product;
drop table if exists Category;

create table Product (
id integer primary key,
name text,
price integer,
photoURL text,
description text,
category_id integer,
foreign key (category_id) references Category(id)
); 

create table Category (
id integer primary key,
name text,
image text,
color text
);

insert into Category (id, name, image, color) values
(1, 'Fruit', 'fruit.png', 'pink'),
(2, 'Vegetables', 'vegetable.png', 'greenyellow'),
(3, 'Bakery', 'bread.png', 'orange'),
(4, 'Meat', 'meat.png', 'rgba(255, 0, 0, 0.753)'),
(5, 'Seafood', 'seafood.png', 'cadetblue'),
(6, 'Household', 'household.png', 'lightslategrey')
;

insert into Product (id, name, price, photoURL, description,category_id) values
(1, 'Apple', 2, 'apple.png','Fresh apples from our local orchard.',1),
(2, 'Banana', 3, 'banana.png','Fresh bananas  from our local orchard.',1),
(3, 'Orange', 4, 'orange.png','Fresh oranges from our local orchard.',1),
(4, 'Kiwi', 3, 'kiwi.png','Fresh kiwis from our local orchard.',1),
(5, 'Pear', 2, 'pear.png','Fresh pears from our local orchard.',1),

(6, 'Cucumber', 2, 'cucumber.png','Fresh cucumbers from our local farm.',2),
(7, 'Avocado', 5, 'avocado.png','Fresh avocados from our local farm.',2),
(8, 'Carrot', 3, 'carrot.png','Fresh carrots from our local farm.',2),
(9, 'Onion', 4, 'onion.png','Fresh onions from our local farm.',2),
(10, 'Potato', 2, 'potato.png','Fresh potatoes from our local farm.',2),

(11, 'Tiger Bread', 2, 'tigerbread.png','Fresh tiger bread from our local bakery.',3),
(12, 'Rolls', 3, 'roll.png','Fresh rolls from our local bakery.',3),
(13, 'Toasts', 3, 'toast.png','Fresh toasts from our local bakery.',3),
(14, 'Muffin', 3, 'muffin.png','Freshly baked in our kitchen.',3),
(15, 'Pastry', 3, 'pastry.png','Freshly baked in our kitchen.',3),

(16, 'Beef', 2, 'beef.png','Freshly preped in our deli section.',4),
(17, 'Chicken', 3, 'chicken.png','Freshly preped in our deli section.',4),
(18, 'Pork', 3, 'pork.png','Freshly preped in our deli section.',4),
(19, 'Lamb', 3, 'lamb.png','Freshly preped in our deli section.',4),

(20, 'Prawns', 2, 'prawn.png','Fresh Prawns selected from our local fishmarket.',5),
(21, 'Salmon', 3, 'salmon.png','Fresh Salmon selected from our local fishmarket.',5),
(22, 'Mussels', 3, 'mussel.png','Fresh Mussels selected from our local fishmarket.',5),
(23, 'Snapper', 3, 'snapper.png','Fresh Snapper selected from our local fishmarket.',5),

(24, 'Softner', 2, 'softner.png','100ml floral heaven',6),
(25, 'Detergent', 3, 'detergent.png','150ml.',6),
(26, 'Toilet rolls', 3, 'toiletrolls.png','12 rolls',6),
(27, 'Paper towel', 3, 'papertowel.png','4 rolls.',6)
;