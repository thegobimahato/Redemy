interface EmailTemplateProps {
  firstName: string;
  otp: string;
}

export function EmailTemplate({ firstName, otp }: EmailTemplateProps) {
  return (
    <div style={{ backgroundColor: "#f9f9f9", padding: "40px 0" }}>
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        role="presentation"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <tr>
          <td align="center">
            <table
              width="480"
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                padding: "32px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                textAlign: "center",
              }}
            >
              <tr>
                <td>
                  <h1
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: "#111111",
                    }}
                  >
                    Welcome to Redemy, {firstName}
                  </h1>

                  <p
                    style={{
                      fontSize: "15px",
                      color: "#444",
                      marginBottom: "20px",
                    }}
                  >
                    You requested to sign up for Redemy. Your one-time code is:
                  </p>

                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      letterSpacing: "4px",
                      color: "#111111",
                      marginBottom: "20px",
                    }}
                  >
                    {otp}
                  </div>

                  <hr
                    style={{
                      border: "0",
                      borderTop: "1px solid #eee",
                      margin: "20px 0",
                    }}
                  />

                  <p
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      marginBottom: "8px",
                    }}
                  >
                    This code will expire in 5 minutes.
                  </p>
                  <p style={{ fontSize: "12px", color: "#888" }}>
                    If you didn&apos;t request this, you can safely ignore this
                    email.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
}
