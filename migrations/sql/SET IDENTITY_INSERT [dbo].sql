SET IDENTITY_INSERT [dbo].[Users] ON;

INSERT INTO [EAC_APPLICATIONS].[dbo].[Users] (id, username, email, password, role, refreshToken, createdAt, updatedAt) 
VALUES
(1, 'eddyodhiambo', 'odhiambo@example.com', '$2b$10$6RU/8ckzGs0yok8hJodsC.kjcHys/FKthKQ6snC.bA9bZ7ywHOCo6', 'superadmin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlZGR5b2RoaWFtYm8iLCJlbWFpbCI6Im9kaGlhbWJvQGV4YW1wbGUuY29tIiwiaWF0IjoxNzI5OTM5MTM4LCJleHAiOjE3MzA1NDM5Mzh9.mQSsteJMY3oE7454PlGWmMRS04CTkuD1y3tmnff6GJ4', '2024-10-08 06:34:23.1550000 +00:00', '2024-10-26 10:38:58.3390000 +00:00'),
(2, 'superadmin', 'sadmin@example.com', '$2b$10$.hF93g99RLbkv443avQsS.6ghB.61I414IACP26G54yslJH/0K9KG', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJzYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE3Mjg4NTYxNjksImV4cCI6MTcyOTQ2MDk2OX0.06MQQYt-rXbHE88MTr2GAkwL3NugAQAZ4gL7yzr_7NE', '2024-10-13 06:53:38.9730000 +00:00', '2024-10-13 21:49:29.7780000 +00:00'),
(3, 'superadmin1', 'superadmin@example.com', '$2b$10$PJpOnehGnc2tgpXkFF2SW.ydBUuiakVLS5PtnBYhBaUqnZt0JZ66u', 'superadmin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzdXBlcmFkbWluMSIsImVtYWlsIjoic3VwZXJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTcyOTMxNTc2NiwiZXhwIjoxNzI5OTIwNTY2fQ.XMniRlqf1brkBGS_177QDCRH-5lfr8L0twIwfABUduw', '2024-10-18 09:43:32.3010000 +00:00', '2024-10-19 05:29:26.9700000 +00:00'),
(4, 'hr-officer', 'hr@example.com', '$2b$10$CBgIGjnIuZ56HvbVY9Nc/e4GmFAy88DRvzoovueEB5S2iemMpKSzW', 'user', NULL, '2024-10-24 11:09:34.4640000 +00:00', '2024-10-24 11:09:34.4640000 +00:00');

SET IDENTITY_INSERT [dbo].[Users] OFF;
