"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  description: string;
  bountyAmount: string;
  status: string;
  project: {
    id: string;
    name: string;
  };
  assignedTo?: {
    walletAddress: string;
  };
}

export default function TasksPage() {
  const { address, isConnected } = useAccount();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    "all" | "open" | "claimed" | "completed"
  >("all");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data.data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Unable to load tasks. Please try again later.");
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const handleClaimTask = async (taskId: string) => {
    if (!isConnected || !address) {
      alert("Please connect your wallet to claim tasks");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}/claim`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ walletAddress: address }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to claim task");
      }

      alert("Task claimed successfully!");
      // Refresh tasks
      window.location.reload();
    } catch (err) {
      console.error("Error claiming task:", err);
      alert("Failed to claim task. Please try again.");
    }
  };

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
                color: "#171717",
                fontWeight: "600",
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
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#171717",
              marginBottom: "8px",
            }}
          >
            Available Tasks
          </h2>
          <p style={{ fontSize: "16px", color: "#737373" }}>
            Claim tasks, complete work, and earn PYUSD rewards
          </p>
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "32px",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "All Tasks", value: "all" as const },
            { label: "Open", value: "open" as const },
            { label: "Claimed", value: "claimed" as const },
            { label: "Completed", value: "completed" as const },
          ].map((filterOption) => (
            <button
              key={filterOption.value}
              onClick={() => setFilter(filterOption.value)}
              style={{
                padding: "8px 16px",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                backgroundColor:
                  filter === filterOption.value ? "#171717" : "#ffffff",
                color: filter === filterOption.value ? "#ffffff" : "#171717",
                transition: "all 0.2s",
              }}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div
            style={{ textAlign: "center", padding: "80px 0", color: "#737373" }}
          >
            <div style={{ fontSize: "16px", marginBottom: "16px" }}>
              Loading tasks...
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
        {!loading && !error && filteredTasks.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              backgroundColor: "#f5f5f5",
              borderRadius: "12px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#171717",
                marginBottom: "8px",
              }}
            >
              No {filter !== "all" ? filter : ""} Tasks Found
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#737373",
                marginBottom: "24px",
              }}
            >
              {filter === "all"
                ? "No tasks available yet. Check back later or create a project!"
                : `No ${filter} tasks at the moment.`}
            </p>
            <Link href="/projects">
              <Button>Browse Projects</Button>
            </Link>
          </div>
        )}

        {/* Tasks List */}
        {!loading && !error && filteredTasks.length > 0 && (
          <>
            <div
              style={{
                marginBottom: "24px",
                fontSize: "14px",
                color: "#737373",
              }}
            >
              Showing {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    padding: "24px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    backgroundColor: "#ffffff",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#171717")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#e5e5e5")
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "8px",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#171717",
                          }}
                        >
                          {task.title}
                        </h4>
                        <span
                          style={{
                            padding: "4px 12px",
                            backgroundColor:
                              task.status === "open"
                                ? "#d1fae5"
                                : task.status === "claimed"
                                ? "#fef3c7"
                                : "#f3f4f6",
                            borderRadius: "9999px",
                            fontSize: "12px",
                            fontWeight: "500",
                            color:
                              task.status === "open"
                                ? "#065f46"
                                : task.status === "claimed"
                                ? "#92400e"
                                : "#6b7280",
                          }}
                        >
                          {task.status}
                        </span>
                      </div>
                      <Link
                        href={`/projects/${task.project.id}`}
                        style={{
                          fontSize: "14px",
                          color: "#2563eb",
                          textDecoration: "none",
                        }}
                      >
                        {task.project.name} →
                      </Link>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#737373",
                          marginTop: "12px",
                          lineHeight: "1.6",
                        }}
                      >
                        {task.description}
                      </p>
                    </div>
                    <div style={{ textAlign: "right", marginLeft: "24px" }}>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#737373",
                          marginBottom: "4px",
                        }}
                      >
                        Bounty
                      </div>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "700",
                          color: "#171717",
                        }}
                      >
                        {task.bountyAmount}
                      </div>
                      <div style={{ fontSize: "12px", color: "#737373" }}>
                        PYUSD
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "16px",
                      borderTop: "1px solid #e5e5e5",
                    }}
                  >
                    {task.assignedTo ? (
                      <div style={{ fontSize: "14px", color: "#737373" }}>
                        Assigned to: {task.assignedTo.walletAddress.slice(0, 6)}
                        ...
                        {task.assignedTo.walletAddress.slice(-4)}
                      </div>
                    ) : (
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#16a34a",
                          fontWeight: "500",
                        }}
                      >
                        ✅ Available to claim
                      </div>
                    )}

                    {task.status === "open" && !task.assignedTo && (
                      <Button
                        onClick={() => handleClaimTask(task.id)}
                        disabled={!isConnected}
                      >
                        Claim Task
                      </Button>
                    )}
                    {task.status === "claimed" &&
                      task.assignedTo?.walletAddress === address && (
                        <Link href={`/tasks/${task.id}/submit`}>
                          <Button>Submit Work</Button>
                        </Link>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
