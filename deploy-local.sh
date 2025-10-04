#!/bin/bash
COMPOSE_FILE="compose.local.yml"

if [ ! -f "$COMPOSE_FILE" ]; then
  echo "❌ Compose file $COMPOSE_FILE not found!"
  exit 1
fi

echo "🧹 Cleaning up existing containers and networks for $ENV..."
docker-compose -f "$COMPOSE_FILE" down --remove-orphans --volumes

echo "🧹 Pruning unused Docker containers, networks, and dangling images..."
docker system prune -a -f --volumes

echo "🔧 Building $ENV with Buildx Bake..."
COMPOSE_BAKE=true docker-compose -f "$COMPOSE_FILE" build

echo "🚀 Starting $ENV..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "✅ $ENV environment deployed successfully!"