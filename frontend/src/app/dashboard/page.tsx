"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Link from "next/link";

interface UserStats {
  projectsOwned: number;
  tasksClaimed: number;
  tasksCompleted: number;
  totalEarned: string;
}

interface Activity {
  id: string;
  type:
    | "project_created"
    | "task_claimed"
    | "task_completed"
    | "payout_received";
  title: string;
  amount?: string;
  timestamp: string;
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [stats, setStats] = useState<UserStats>({
    projectsOwned: 0,
    tasksClaimed: 0,
    tasksCompleted: 0,
    totalEarned: "0",
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      fetchUserData();
    }
  }, [address, isConnected]);

  const fetchUserData = async () => {
    if (!address) return;

    try {
      setLoading(true);

      // Fetch user stats
      const statsResponse = await fetch(
        `http://localhost:5000/api/users/${address}/stats`
      );
      const statsData = await statsResponse.json();

      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch user activity
      const activityResponse = await fetch(
        `http://localhost:5000/api/users/${address}/activity?limit=10`
      );
      const activityData = await activityResponse.json();

      if (activityData.success) {
        setActivities(activityData.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
        {/* Header */}
        <header
          style={{
            borderBottom: "1px solid #e5e5e5",
            backgroundColor: "#ffffff",
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
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#171717",
                }}
              >
                DevQuest
              </h1>
            </Link>
            <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <ConnectKitButton />
            </nav>
          </div>
        </header>

        <main
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "80px 16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "24px" }}>🔐</div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#171717",
              marginBottom: "16px",
            }}
          >
            Connect Your Wallet
          </h2>
          <p
            style={{ fontSize: "16px", color: "#737373", marginBottom: "32px" }}
          >
            Connect your wallet to view your dashboard
          </p>
          <ConnectKitButton />
        </main>
      </div>
    );
  }

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
            <Link
              href="/dashboard"
              style={{
                fontSize: "14px",
                textDecoration: "none",
                color: "#171717",
                fontWeight: "600",
              }}
            >
              Dashboard
            </Link>
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
            Dashboard
          </h2>
          <p style={{ fontSize: "16px", color: "#737373" }}>
            Track your projects, tasks, and earnings
          </p>
        </div>

        {/* Wallet Info */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#f5f5f5",
            borderRadius: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{ fontSize: "12px", color: "#737373", marginBottom: "8px" }}
          >
            Connected Wallet
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#171717",
              fontWeight: "600",
              fontFamily: "monospace",
            }}
          >
            {address}
          </div>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div
            style={{ textAlign: "center", padding: "40px", color: "#737373" }}
          >
            Loading your stats...
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  padding: "24px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#737373",
                    marginBottom: "8px",
                  }}
                >
                  Projects Owned
                </div>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#171717",
                  }}
                >
                  {stats.projectsOwned}
                </div>
              </div>

              <div
                style={{
                  padding: "24px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#737373",
                    marginBottom: "8px",
                  }}
                >
                  Tasks Claimed
                </div>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#171717",
                  }}
                >
                  {stats.tasksClaimed}
                </div>
              </div>

              <div
                style={{
                  padding: "24px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#737373",
                    marginBottom: "8px",
                  }}
                >
                  Tasks Completed
                </div>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#171717",
                  }}
                >
                  {stats.tasksCompleted}
                </div>
              </div>

              <div
                style={{
                  padding: "24px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#737373",
                    marginBottom: "8px",
                  }}
                >
                  Total Earned
                </div>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#16a34a",
                  }}
                >
                  {stats.totalEarned}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#737373",
                    marginTop: "4px",
                  }}
                >
                  PYUSD
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              style={{
                padding: "24px",
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                marginBottom: "40px",
                backgroundColor: "#ffffff",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#171717",
                  marginBottom: "16px",
                }}
              >
                Quick Actions
              </h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/projects/create">
                  <Button>+ Create Project</Button>
                </Link>
                <Link href="/tasks">
                  <Button variant="outline">Browse Tasks</Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline">View All Projects</Button>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#171717",
                  marginBottom: "24px",
                }}
              >
                Recent Activity
              </h3>
              {activities.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "12px",
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                    📊
                  </div>
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#171717",
                      marginBottom: "8px",
                    }}
                  >
                    No Activity Yet
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#737373",
                      marginBottom: "24px",
                    }}
                  >
                    Start by creating a project or claiming a task!
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      justifyContent: "center",
                    }}
                  >
                    <Link href="/projects/create">
                      <Button>Create Project</Button>
                    </Link>
                    <Link href="/tasks">
                      <Button variant="outline">Browse Tasks</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      style={{
                        padding: "16px",
                        border: "1px solid #e5e5e5",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#171717",
                            fontWeight: "500",
                          }}
                        >
                          {activity.title}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#737373",
                            marginTop: "4px",
                          }}
                        >
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      {activity.amount && (
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#16a34a",
                          }}
                        >
                          +{activity.amount} PYUSD
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
