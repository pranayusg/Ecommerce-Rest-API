SELECT * FROM ecommerce.users;
SELECT * FROM ecommerce.category;
SELECT * FROM ecommerce.products;
SELECT * FROM ecommerce.orders;
SELECT * FROM ecommerce.order_details;
SELECT user_id FROM ecommerce.orders where user_id=1;

delete from  ecommerce.order_details where product_id=1;

select P.id,P.name,P.description,P.price,C.title as category
from ecommerce.products P
inner join ecommerce.category C
on P.cat_id=C.id
order by P.id;

update ecommerce.order_details set quantity=? where id=1;

INSERT INTO ecommerce.order_details(order_id,product_id,quantity)VALUES(?,?,?);

INSERT INTO ecommerce.orders(user_id)VALUES (?);

ALTER TABLE ecommerce.order_details ADD UNIQUE productId_orderId_UNIQUE (product_id, order_id);

SELECT * FROM INFORMATION_SCHEMA. TABLES;



set @a=1.2222;
select cast(@a as ) as num;