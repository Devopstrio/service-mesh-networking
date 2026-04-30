module "mesh_cluster" {
  source = "./modules/kubernetes"

  cluster_name = "mesh-primary-01"
}

module "mesh_db" {
  source = "./modules/database"

  db_name = "mesh_registry_metadata"
}

module "mesh_cache" {
  source = "./modules/redis"

  cluster_mode = false
}

resource "kubernetes_namespace" "mesh_system" {
  metadata {
    name = "mesh-system"
    labels = {
      "mesh.io/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "mesh_defaults" {
  metadata {
    name      = "mesh-global-config"
    namespace = kubernetes_namespace.mesh_system.metadata[0].name
  }

  data = {
    "mtls-mode"        = "STRICT"
    "trust-domain"     = "cluster.local"
    "outbound-traffic" = "REGISTRY_ONLY"
  }
}
