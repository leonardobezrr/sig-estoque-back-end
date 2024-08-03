setup:
	npm i
	sudo docker compose up -d
	npx prisma migrate dev