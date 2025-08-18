interface EmailTemplateProps {
  firstName: string;
  otp: string;
}

export function EmailTemplate({ firstName, otp }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        backgroundColor: "#0d0d0d",
        color: "#f5f5f5",
        padding: "24px",
        borderRadius: "12px",
      }}
    >
      <h1 style={{ color: "#ffffff", fontSize: "24px", marginBottom: "12px" }}>
        Welcome, {firstName} 👋
      </h1>

      <p style={{ fontSize: "16px", marginBottom: "16px", color: "#f1f1f1" }}>
        Your one-time password (OTP) is:
      </p>

      <div
        style={{
          backgroundColor: "#1a1a1a",
          color: "#00ffae",
          padding: "12px 20px",
          borderRadius: "8px",
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          letterSpacing: "2px",
        }}
      >
        {otp}
      </div>

      <p style={{ marginTop: "20px", fontSize: "14px", color: "#b3b3b3" }}>
        This code will expire in 5 minutes. Please don't share it with anyone.
      </p>
    </div>
  );
}
