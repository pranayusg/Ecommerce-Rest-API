SELECT * FROM ecommerce.users;
SELECT * FROM ecommerce.category;
SELECT * FROM ecommerce.products;
SELECT * FROM ecommerce.orders;
SELECT * FROM ecommerce.order_details;
SELECT user_id FROM ecommerce.orders where user_id=1;
delete from  ecommerce.orders where id=7;

select P.id,P.name,P.description,P.price,C.title as category
from ecommerce.products P
inner join ecommerce.category C
on P.cat_id=C.id
order by P.id;

update 

INSERT INTO ecommerce.order_details(order_id,product_id,quantity)VALUES(?,?,?);

INSERT INTO ecommerce.orders(user_id)VALUES (?);

ALTER TABLE ecommerce.order_details ADD UNIQUE productId_orderId_UNIQUE (product_id, order_id);




