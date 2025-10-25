"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
  totalBounty: string;
  status: string;
  owner: {
    walletAddress: string;
  };
  createdAt: string;
}

export default function ProjectsPage() {
  const { isConnected } = useAccount();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Unable to load projects. Please try again later.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #e5e5e5",
          backgroundColor: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#171717",
                borderRadius: "4px",
              }}
            />
            <h1
              style={{ fontSize: "20px", fontWeight: "bold", color: "#171717" }}
            >
              DevQuest
            </h1>
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link
              href="/projects"
              style={{
                fontSize: "14px",
                textDecoration: "none",
                color: "#171717",
                fontWeight: "600",
              }}
            >
              Projects
            </Link>
            <Link
              href="/tasks"
              style={{
                fontSize: "14px",
                textDecoration: "none",
                color: "#737373",
                fontWeight: "500",
              }}
            >
              Tasks
            </Link>
            {isConnected && (
              <Link
                href="/dashboard"
                style={{
                  fontSize: "14px",
                  textDecoration: "none",
                  color: "#737373",
                  fontWeight: "500",
                }}
              >
                Dashboard
              </Link>
            )}
            <ConnectKitButton />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 16px" }}
      >
        {/* Page Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#171717",
                marginBottom: "8px",
              }}
            >
              All Projects
            </h2>
            <p style={{ fontSize: "16px", color: "#737373" }}>
              Browse open source projects and contribute to earn PYUSD rewards
            </p>
          </div>
          <Link href={isConnected ? "/projects/create" : "#"}>
            <Button
              size="lg"
              onClick={(e) => {
                if (!isConnected) {
                  e.preventDefault();
                  alert("Please connect your wallet to create a project");
                }
              }}
            >
              + Create Project
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            style={{ textAlign: "center", padding: "80px 0", color: "#737373" }}
          >
            <div style={{ fontSize: "16px", marginBottom: "16px" }}>
              Loading projects...
            </div>
            <div style={{ fontSize: "14px" }}>Fetching data from backend</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div
              style={{
                fontSize: "16px",
                color: "#dc2626",
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              backgroundColor: "#f5f5f5",
              borderRadius: "12px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📁</div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#171717",
                marginBottom: "8px",
              }}
            >
              No Projects Yet
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#737373",
                marginBottom: "24px",
              }}
            >
              Be the first to create a project and start building!
            </p>
            <Link href={isConnected ? "/projects/create" : "#"}>
              <Button
                onClick={(e) => {
                  if (!isConnected) {
                    e.preventDefault();
                    alert("Please connect your wallet to create a project");
                  }
                }}
              >
                Create First Project
              </Button>
            </Link>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <>
            <div
              style={{
                marginBottom: "24px",
                fontSize: "14px",
                color: "#737373",
              }}
            >
              Showing {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      padding: "24px",
                      border: "1px solid #e5e5e5",
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      backgroundColor: "#ffffff",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#171717";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e5e5e5";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Project Header */}
                    <div style={{ marginBottom: "16px" }}>
                      <h4
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          marginBottom: "8px",
                          color: "#171717",
                        }}
                      >
                        {project.name}
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#737373",
                          lineHeight: "1.5",
                          marginBottom: "12px",
                        }}
                      >
                        {project.description.length > 120
                          ? `${project.description.slice(0, 120)}...`
                          : project.description}
                      </p>
                    </div>

                    {/* Project Stats */}
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: "16px",
                        borderTop: "1px solid #e5e5e5",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "12px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#737373",
                              marginBottom: "4px",
                            }}
                          >
                            Total Bounty
                          </div>
                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: "700",
                              color: "#171717",
                            }}
                          >
                            {project.totalBounty} PYUSD
                          </div>
                        </div>
                        <div
                          style={{
                            padding: "4px 12px",
                            backgroundColor:
                              project.status === "active"
                                ? "#d1fae5"
                                : "#f3f4f6",
                            borderRadius: "9999px",
                            fontSize: "12px",
                            fontWeight: "500",
                            color:
                              project.status === "active"
                                ? "#065f46"
                                : "#6b7280",
                          }}
                        >
                          {project.status}
                        </div>
                      </div>
                      <div style={{ fontSize: "12px", color: "#737373" }}>
                        Owner: {project.owner.walletAddress.slice(0, 6)}...
                        {project.owner.walletAddress.slice(-4)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
