import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateReport = (
  stats
) => {
  const doc = new jsPDF();

  const pageWidth =
    doc.internal.pageSize.getWidth();

  const cleanText = (
    text = ""
  ) =>
    text
      .replace(
        /[^\x20-\x7E]/g,
        " "
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  const ensureSpace = (
    currentY,
    requiredHeight = 30
  ) => {
    if (
      currentY +
        requiredHeight >
      280
    ) {
      doc.addPage();
      return 20;
    }

    return currentY;
  };

  // =====================================
  // HEADER
  // =====================================

  doc.setFillColor(
    220,
    38,
    38
  );

  doc.rect(
    0,
    0,
    210,
    25,
    "F"
  );

  doc.setTextColor(
    255,
    255,
    255
  );

  doc.setFontSize(18);

  doc.text(
    "Blood Ecosystem Intelligence Report",
    pageWidth / 2,
    16,
    {
      align: "center",
    }
  );

  doc.setTextColor(
    0,
    0,
    0
  );

  doc.setFontSize(10);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    35
  );

  // =====================================
  // KPI SUMMARY
  // =====================================

  autoTable(doc, {
    startY: 45,

    head: [["Metric", "Value"]],

    body: [
      [
        "Total Donors",
        stats.totalDonors || 0,
      ],
      [
        "Eligible Donors",
        stats.eligibleDonors || 0,
      ],
      [
        "Ineligible Donors",
        stats.ineligibleDonors || 0,
      ],
      [
        "Inventory Units",
        stats.totalInventory || 0,
      ],
      [
        "Emergency Requests",
        stats.emergencyRequests || 0,
      ],
      [
        "Critical Requests",
        stats.criticalRequests || 0,
      ],
    ],

    headStyles: {
      fillColor: [
        220,
        38,
        38,
      ],
    },
  });

  let y =
    doc.lastAutoTable.finalY +
    10;

  // =====================================
  // SHORTAGE ALERTS
  // =====================================

  y = ensureSpace(
    y,
    60
  );

  doc.setFontSize(14);

  doc.text(
    "Blood Shortage Alerts",
    14,
    y
  );

  y += 5;

  autoTable(doc, {
    startY: y,

    head: [
      [
        "Blood Group",
        "Available",
        "Demand",
        "Deficit",
      ],
    ],

    body:
      stats.shortageAlerts
        ?.length > 0
        ? stats.shortageAlerts.map(
            (
              alert
            ) => [
              alert.bloodGroup,
              alert.available,
              alert.demand,
              alert.shortage,
            ]
          )
        : [
            [
              "None",
              "-",
              "-",
              "-",
            ],
          ],

    headStyles: {
      fillColor: [
        239,
        68,
        68,
      ],
    },
  });

  y =
    doc.lastAutoTable.finalY +
    10;

  // =====================================
  // AI RECOMMENDATION
  // =====================================

  y = ensureSpace(
    y,
    50
  );

  doc.setFontSize(14);

  doc.text(
    "AI Recommendation",
    14,
    y
  );

  y += 8;

  doc.setFontSize(10);

  const recommendationLines =
    doc.splitTextToSize(
      cleanText(
        stats.aiRecommendation
      ),
      180
    );

  doc.text(
    recommendationLines,
    14,
    y
  );

  y +=
    recommendationLines.length *
      5 +
    12;

  // =====================================
  // BLOOD DRIVE PLAN
  // =====================================

  if (
    stats.bloodDrivePlan
  ) {
    y = ensureSpace(
      y,
      70
    );

    doc.setFontSize(14);

    doc.text(
      "AI Blood Drive Plan",
      14,
      y
    );

    y += 5;

    autoTable(doc, {
      startY: y,

      body: [
        [
          "City",
          stats
            .bloodDrivePlan
            .city,
        ],

        [
          "Target Blood Group",
          stats
            .bloodDrivePlan
            .targetBloodGroup,
        ],

        [
          "Potential Donors",
          stats
            .bloodDrivePlan
            .potentialDonors,
        ],

        [
          "Expected Collection",
          `${Math.round(
            stats
              .bloodDrivePlan
              .expectedCollection
          )} Units`,
        ],

        [
          "Priority",
          stats
            .bloodDrivePlan
            .priority,
        ],
      ],

      columnStyles: {
        0: {
          fontStyle:
            "bold",
        },
      },
    });

    y =
      doc.lastAutoTable.finalY +
      10;
  }

  // =====================================
  // FULFILLMENT ANALYSIS
  // =====================================

  if (
    stats
      .fulfillmentAnalysis
      ?.length > 0
  ) {
    y = ensureSpace(
      y,
      80
    );

    doc.setFontSize(14);

    doc.text(
      "Emergency Fulfillment Analysis",
      14,
      y
    );

    y += 5;

    autoTable(doc, {
      startY: y,

      head: [
        [
          "Hospital",
          "Blood Group",
          "Required",
          "Probability",
        ],
      ],

      body:
        stats.fulfillmentAnalysis.map(
          (
            item
          ) => [
            item.hospital,
            item.bloodGroup,
            item.unitsRequired,
            `${item.fulfillmentProbability}%`,
          ]
        ),

      headStyles: {
        fillColor: [
          59,
          130,
          246,
        ],
      },
    });

    y =
      doc.lastAutoTable.finalY +
      10;
  }

  // =====================================
  // DONOR OUTREACH
  // =====================================

  if (
    stats.donorOutreachMessage
  ) {
    y = ensureSpace(
      y,
      100
    );

    doc.setFontSize(14);

    doc.text(
      "Donor Outreach Message",
      14,
      y
    );

    y += 8;

    const outreachLines =
      doc.splitTextToSize(
        cleanText(
          stats.donorOutreachMessage
        ),
        180
      );

    doc.setFontSize(10);

    doc.text(
      outreachLines,
      14,
      y
    );
  }

  // =====================================
  // SAVE
  // =====================================

  doc.save(
    `Blood_Intelligence_Report_${Date.now()}.pdf`
  );
};
