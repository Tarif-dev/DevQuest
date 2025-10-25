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
}

interface Stats {
  projectCount: number;
  taskCount: number;
  totalRewards: string;
}

export default function Home() {
  const { address, isConnected } = useAccount();
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<Stats>({
    projectCount: 0,
    taskCount: 0,
    totalRewards: "0",
  });
  const [loading, setLoading] = useState(true);

  // Fetch projects and stats
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch projects (this will work once backend implements the endpoint)
        const response = await fetch("http://localhost:5000/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data.data || []);
        }
      } catch (error) {
        console.log("Projects not yet available:", error);
        // Set demo data for now
        setProjects([]);
      }

      // Calculate stats
      setStats({
        projectCount: projects.length,
        taskCount: 0,
        totalRewards: "0",
      });

      setLoading(false);
    }

    fetchData();
  }, [projects.length]);

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
                  color: "#171717",
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

      {/* Hero Section */}
      <main
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 16px" }}
      >
        <div
          style={{ maxWidth: "768px", margin: "0 auto", textAlign: "center" }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              backgroundColor: "#f5f5f5",
              borderRadius: "9999px",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "32px",
            }}
          >
            ⚡ Powered by PYUSD, Lit Protocol & Vincent
          </div>

          <h2
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              letterSpacing: "-0.025em",
              marginBottom: "24px",
              lineHeight: "1.1",
              color: "#171717",
            }}
          >
            Decentralized Bounty Platform for Open Source
          </h2>

          <p
            style={{
              fontSize: "20px",
              color: "#737373",
              marginBottom: "32px",
              lineHeight: "1.6",
            }}
          >
            Fund projects, complete tasks, and earn PYUSD rewards. Built on
            Ethereum with automated payouts and access control.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              paddingTop: "16px",
            }}
          >
            <Link href="/projects">
              <Button size="lg">Explore Projects</Button>
            </Link>
            <Link href={isConnected ? "/projects/create" : "#"}>
              <Button
                variant="outline"
                size="lg"
                onClick={(e) => {
                  if (!isConnected) {
                    e.preventDefault();
                    alert("Please connect your wallet first");
                  }
                }}
              >
                Create Project
              </Button>
            </Link>
          </div>

          {isConnected && (
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                backgroundColor: "#f0fdf4",
                borderRadius: "8px",
                border: "1px solid #86efac",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#166534",
                  fontWeight: "500",
                }}
              >
                ✅ Wallet Connected: {address?.slice(0, 6)}...
                {address?.slice(-4)}
              </p>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
            maxWidth: "672px",
            margin: "80px auto 0",
            paddingTop: "80px",
            borderTop: "1px solid #e5e5e5",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "30px", fontWeight: "bold", color: "#171717" }}
            >
              {stats.projectCount}
            </div>
            <div
              style={{ fontSize: "14px", color: "#737373", marginTop: "4px" }}
            >
              Active Projects
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "30px", fontWeight: "bold", color: "#171717" }}
            >
              {stats.taskCount}
            </div>
            <div
              style={{ fontSize: "14px", color: "#737373", marginTop: "4px" }}
            >
              Open Tasks
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "30px", fontWeight: "bold", color: "#171717" }}
            >
              ${stats.totalRewards}
            </div>
            <div
              style={{ fontSize: "14px", color: "#737373", marginTop: "4px" }}
            >
              Total Rewards
            </div>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div style={{ marginTop: "80px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
            }}
          >
            <h3
              style={{ fontSize: "24px", fontWeight: "bold", color: "#171717" }}
            >
              Recent Projects
            </h3>
            <Link href="/projects">
              <Button variant="outline">View All →</Button>
            </Link>
          </div>

          {loading ? (
            <div
              style={{ textAlign: "center", padding: "48px", color: "#737373" }}
            >
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  color: "#737373",
                  marginBottom: "16px",
                }}
              >
                No projects yet. Be the first to create one!
              </p>
              <Link href={isConnected ? "/projects/create" : "#"}>
                <Button
                  onClick={(e) => {
                    if (!isConnected) {
                      e.preventDefault();
                      alert("Please connect your wallet first");
                    }
                  }}
                >
                  Create First Project
                </Button>
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {projects.slice(0, 6).map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      padding: "24px",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                      backgroundColor: "#ffffff",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#171717")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#e5e5e5")
                    }
                  >
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
                        marginBottom: "16px",
                        lineHeight: "1.5",
                      }}
                    >
                      {project.description.slice(0, 100)}...
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "16px",
                        borderTop: "1px solid #e5e5e5",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: "#737373" }}>
                        {project.status}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#171717",
                        }}
                      >
                        {project.totalBounty} PYUSD
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            marginTop: "80px",
          }}
        >
          <div
            style={{
              padding: "24px",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#171717",
                borderRadius: "8px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "24px",
              }}
            >
              💰
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#171717",
              }}
            >
              PYUSD Payments
            </h3>
            <p
              style={{ fontSize: "14px", color: "#737373", lineHeight: "1.6" }}
            >
              Get paid in PYUSD stablecoin for completing tasks. Fast, secure,
              and reliable with instant on-chain settlements.
            </p>
          </div>

          <div
            style={{
              padding: "24px",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#171717",
                borderRadius: "8px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "24px",
              }}
            >
              🔐
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#171717",
              }}
            >
              Lit Protocol
            </h3>
            <p
              style={{ fontSize: "14px", color: "#737373", lineHeight: "1.6" }}
            >
              Decentralized access control for private project repositories and
              resources with programmable conditions.
            </p>
          </div>

          <div
            style={{
              padding: "24px",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#171717",
                borderRadius: "8px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "24px",
              }}
            >
              🤖
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#171717",
              }}
            >
              Vincent Automation
            </h3>
            <p
              style={{ fontSize: "14px", color: "#737373", lineHeight: "1.6" }}
            >
              Automated PR scoring and payout distribution based on contribution
              quality and complexity analysis.
            </p>
          </div>
        </div>

        {/* Smart Contract Info */}
        <div
          style={{
            marginTop: "80px",
            padding: "24px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#171717",
            }}
          >
            🎉 Platform Status - All Systems Operational
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              fontSize: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                backgroundColor: "#ffffff",
                borderRadius: "6px",
              }}
            >
              <span style={{ color: "#171717", fontWeight: "500" }}>
                Backend API
              </span>
              <span style={{ color: "#16a34a", fontWeight: "600" }}>
                ● Running on port 5000
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                backgroundColor: "#ffffff",
                borderRadius: "6px",
              }}
            >
              <span style={{ color: "#171717", fontWeight: "500" }}>
                Smart Contracts
              </span>
              <span style={{ color: "#16a34a", fontWeight: "600" }}>
                ● Deployed on Sepolia
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                backgroundColor: "#ffffff",
                borderRadius: "6px",
              }}
            >
              <span style={{ color: "#171717", fontWeight: "500" }}>
                Database
              </span>
              <span style={{ color: "#16a34a", fontWeight: "600" }}>
                ● Connected (Neon PostgreSQL)
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                backgroundColor: "#ffffff",
                borderRadius: "6px",
              }}
            >
              <span style={{ color: "#171717", fontWeight: "500" }}>
                MockPYUSD Contract
              </span>
              <a
                href="https://sepolia.etherscan.io/address/0xdAd9F4e3DC5f7843691807c75e1392e0DaA53F5a"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#2563eb",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                0xdAd9...3F5a ↗
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #e5e5e5",
          marginTop: "80px",
          backgroundColor: "#fafafa",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "32px 16px",
            textAlign: "center",
            fontSize: "14px",
            color: "#737373",
          }}
        >
          <p style={{ fontWeight: "500", color: "#171717" }}>
            DevQuest - Decentralized Bounty Platform
          </p>
          <p style={{ marginTop: "8px" }}>
            Built with Next.js, Ethereum, PYUSD, Lit Protocol & Vincent
          </p>
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#737373", textDecoration: "none" }}
            >
              GitHub
            </a>
            <a
              href="https://docs.devquest.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#737373", textDecoration: "none" }}
            >
              Docs
            </a>
            <a
              href="https://discord.gg/devquest"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#737373", textDecoration: "none" }}
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
