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
  assignee?: {
    id: string;
    walletAddress: string;
    username: string | null;
    reputation: number;
  };
}

export default function TasksPage() {
  const { address, isConnected } = useAccount();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    "all" | "OPEN" | "ASSIGNED" | "COMPLETED"
  >("all");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [prUrl, setPrUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    if (filter === "ASSIGNED") {
      return task.status === "ASSIGNED" || task.status === "IN_PROGRESS";
    }
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
        const data = await response.json();
        throw new Error(data.message || "Failed to claim task");
      }

      alert("Task claimed successfully!");
      // Refresh tasks
      window.location.reload();
    } catch (err: any) {
      console.error("Error claiming task:", err);
      alert(err.message || "Failed to claim task. Please try again.");
    }
  };

  const handleSubmitWork = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prUrl) {
      alert("Please enter a PR URL");
      return;
    }

    if (!selectedTask) return;

    setSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${selectedTask.id}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prUrl,
            walletAddress: address,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to submit work");
      }

      const data = await response.json();

      alert(
        `Work submitted successfully! Your contribution is being analyzed by Vincent AI. Score: ${data.data.contribution.score}/100`
      );

      // Close modal and reset
      setShowSubmitModal(false);
      setPrUrl("");
      setSelectedTask(null);

      // Refresh tasks
      window.location.reload();
    } catch (err: any) {
      console.error("Error submitting work:", err);
      alert(err.message || "Failed to submit work. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const openSubmitModal = (task: Task) => {
    setSelectedTask(task);
    setShowSubmitModal(true);
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
            { label: "Open", value: "OPEN" as const },
            { label: "Claimed", value: "ASSIGNED" as const },
            { label: "Completed", value: "COMPLETED" as const },
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
                              task.status === "OPEN"
                                ? "#d1fae5"
                                : task.status === "ASSIGNED" ||
                                  task.status === "IN_PROGRESS"
                                ? "#fef3c7"
                                : task.status === "SUBMITTED"
                                ? "#dbeafe"
                                : task.status === "COMPLETED"
                                ? "#dcfce7"
                                : "#f3f4f6",
                            borderRadius: "9999px",
                            fontSize: "12px",
                            fontWeight: "500",
                            color:
                              task.status === "OPEN"
                                ? "#065f46"
                                : task.status === "ASSIGNED" ||
                                  task.status === "IN_PROGRESS"
                                ? "#92400e"
                                : task.status === "SUBMITTED"
                                ? "#1e40af"
                                : task.status === "COMPLETED"
                                ? "#166534"
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
                    {task.assignee ? (
                      <div style={{ fontSize: "14px", color: "#737373" }}>
                        Assigned to: {task.assignee.walletAddress.slice(0, 6)}
                        ...
                        {task.assignee.walletAddress.slice(-4)}
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

                    {task.status === "OPEN" && !task.assignee && (
                      <Button
                        onClick={() => handleClaimTask(task.id)}
                        disabled={!isConnected}
                      >
                        Claim Task
                      </Button>
                    )}
                    {(task.status === "ASSIGNED" ||
                      task.status === "IN_PROGRESS") &&
                      task.assignee?.walletAddress.toLowerCase() ===
                        address?.toLowerCase() && (
                        <Button onClick={() => openSubmitModal(task)}>
                          Submit Work
                        </Button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Submit Work Modal */}
      {showSubmitModal && selectedTask && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "16px",
          }}
          onClick={() => setShowSubmitModal(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "32px",
              maxWidth: "600px",
              width: "100%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#171717",
                marginBottom: "8px",
              }}
            >
              Submit Your Work
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#737373",
                marginBottom: "24px",
              }}
            >
              Submit your Pull Request for review. Vincent AI will analyze your
              contribution and calculate your payout.
            </p>

            {/* Task Info */}
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#171717",
                  marginBottom: "8px",
                }}
              >
                {selectedTask.title}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#737373",
                  marginBottom: "12px",
                }}
              >
                {selectedTask.project.name}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#171717",
                }}
              >
                {selectedTask.bountyAmount} PYUSD
              </div>
            </div>

            <form onSubmit={handleSubmitWork}>
              <div style={{ marginBottom: "24px" }}>
                <label
                  htmlFor="prUrl"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#171717",
                    marginBottom: "8px",
                  }}
                >
                  Pull Request URL *
                </label>
                <input
                  type="url"
                  id="prUrl"
                  required
                  value={prUrl}
                  onChange={(e) => setPrUrl(e.target.value)}
                  placeholder="https://github.com/user/repo/pull/123"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
                <p
                  style={{
                    fontSize: "12px",
                    color: "#737373",
                    marginTop: "8px",
                  }}
                >
                  Your PR will be analyzed by Vincent AI. Score: 70-100 = Full
                  payout, 60-69 = Partial payout
                </p>
              </div>

              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#171717",
                    marginBottom: "8px",
                  }}
                >
                  💡 Submission Tips
                </div>
                <ul
                  style={{
                    fontSize: "13px",
                    color: "#374151",
                    paddingLeft: "20px",
                    lineHeight: "1.6",
                  }}
                >
                  <li>Make sure your PR is complete and tested</li>
                  <li>Include clear description and documentation</li>
                  <li>Add tests if applicable</li>
                  <li>Follow the project's code style</li>
                </ul>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <Button type="submit" disabled={submitting} style={{ flex: 1 }}>
                  {submitting
                    ? "Submitting & Analyzing..."
                    : "Submit for Review"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowSubmitModal(false);
                    setPrUrl("");
                  }}
                  disabled={submitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
