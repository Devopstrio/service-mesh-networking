.PHONY: help build up down test lint migrate simulate-traffic apply-policy

help:
	@echo "Service Mesh Networking - Management Commands"
	@echo "------------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "simulate-traffic   : Run mesh traffic simulation"
	@echo "apply-policy       : Apply global mesh policies"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/control-plane core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

simulate-traffic:
	docker-compose exec api python scripts/simulate/traffic.py

apply-policy:
	docker-compose exec api python scripts/simulate/policy.py
