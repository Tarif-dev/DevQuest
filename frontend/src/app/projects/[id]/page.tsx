"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Project {
  id: string;
  name: string;
  description: string;
  repoUrl: string | null;
  totalBounty: string;
  status: string;
  owner: {
    id: string;
    walletAddress: string;
    username: string | null;
    reputation: number;
  };
  tasks: any[];
  createdAt: string;
  updatedAt: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const { address, isConnected } = useAccount();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const projectId = params.id as string;

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/projects/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProject(data.data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Unable to load project. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const isOwner =
    project &&
    address &&
    project.owner.walletAddress.toLowerCase() === address.toLowerCase();

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
                color: "#737373",
                fontWeight: "500",
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
        {/* Back Link */}
        <Link
          href="/projects"
          style={{
            fontSize: "14px",
            color: "#737373",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          ← Back to Projects
        </Link>

        {/* Loading State */}
        {loading && (
          <div
            style={{ textAlign: "center", padding: "80px 0", color: "#737373" }}
          >
            Loading project details...
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

        {/* Project Details */}
        {!loading && !error && project && (
          <>
            {/* Project Header */}
            <div
              style={{
                padding: "32px",
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "24px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#171717",
                      marginBottom: "16px",
                    }}
                  >
                    {project.name}
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        padding: "4px 12px",
                        backgroundColor:
                          project.status.toLowerCase() === "active"
                            ? "#d1fae5"
                            : "#f3f4f6",
                        borderRadius: "9999px",
                        fontSize: "12px",
                        fontWeight: "500",
                        color:
                          project.status.toLowerCase() === "active"
                            ? "#065f46"
                            : "#6b7280",
                      }}
                    >
                      {project.status}
                    </div>
                    <div style={{ fontSize: "14px", color: "#737373" }}>
                      Owner: {project.owner.walletAddress.slice(0, 10)}...
                      {project.owner.walletAddress.slice(-8)}
                    </div>
                    {isOwner && (
                      <div
                        style={{
                          padding: "4px 12px",
                          backgroundColor: "#dbeafe",
                          borderRadius: "9999px",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#1e40af",
                        }}
                      >
                        You own this project
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
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
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#171717",
                    }}
                  >
                    {project.totalBounty} PYUSD
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "24px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  marginBottom: "24px",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#171717",
                    marginBottom: "12px",
                  }}
                >
                  Description
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#525252",
                    lineHeight: "1.6",
                  }}
                >
                  {project.description}
                </p>
              </div>

              {project.repoUrl && (
                <div style={{ marginBottom: "16px" }}>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "14px",
                      color: "#2563eb",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    🔗 View Repository →
                  </a>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  paddingTop: "24px",
                  borderTop: "1px solid #e5e5e5",
                }}
              >
                {isOwner && <Button variant="outline">Create Task</Button>}
                <Button variant="outline">View on Blockchain</Button>
              </div>
            </div>

            {/* Tasks Section */}
            <div
              style={{
                padding: "32px",
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#171717",
                  marginBottom: "16px",
                }}
              >
                Tasks
              </h3>
              {project.tasks.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                    📋
                  </div>
                  <p style={{ fontSize: "14px", color: "#737373" }}>
                    No tasks created yet.
                    {isOwner && " Create your first task to get started!"}
                  </p>
                  {isOwner && (
                    <Button style={{ marginTop: "16px" }}>
                      Create First Task
                    </Button>
                  )}
                </div>
              ) : (
                <div style={{ fontSize: "14px", color: "#737373" }}>
                  {project.tasks.length} task(s) available
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
