import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-blue-50 to-blue-100">
      <main className="max-w-4xl text-center">
        <article className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Efficient pharmaceutical inventory management ensures essential
            medications remain available, optimizes operational workflow, and
            enhances patient care. A robust system reduces costs, minimizes
            medication errors, and streamlines pharmacy operations.
          </p>

          <Separator className="my-4 bg-gray-300" />

          <h3 className="text-2xl font-semibold text-blue-800">
            Key Benefits of a Pharmaceutical Inventory System:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: "workflow-efficiency",
                title: "Improved Workflow & Efficiency",
                description:
                  "Automated inventory systems streamline processes like order management and stock tracking, allowing staff to focus on patient care.",
              },
              {
                id: "accuracy-safety",
                title: "Enhanced Accuracy & Safety",
                description:
                  "Barcode scanning and automated data entry reduce human errors, ensuring precise medication dispensing.",
              },
              {
                id: "real-time-monitoring",
                title: "Real-Time Monitoring & Reporting",
                description:
                  "Track inventory levels, expiration dates, and usage patterns with real-time data for proactive management.",
              },
              {
                id: "cost-reduction",
                title: "Cost Reduction & Waste Minimization",
                description:
                  "Maintain optimal stock levels, reduce overstocking, and minimize expired medication wastage for cost savings.",
              },
              {
                id: "regulatory-compliance",
                title: "Regulatory Compliance & Audits",
                description:
                  "Ensure adherence to regulations by maintaining accurate records and facilitating seamless audits.",
              },
            ].map((benefit) => (
              <Card
                key={benefit.id}
                className="p-4 shadow-md hover:shadow-lg transition"
              >
                <CardContent>
                  <h4 className="text-lg font-semibold text-blue-700">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-4 bg-gray-300" />

          <h4 className="text-xl font-semibold text-blue-800">Conclusion:</h4>
          <p className="text-gray-700">
            Investing in a pharmaceutical inventory management system enhances
            efficiency, reduces costs, and ensures optimal patient outcomes.
            Advanced technology helps maintain medication availability and
            regulatory compliance.
          </p>

          <Link
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            href={"/inventory-analysis"}
          >
            Check Analytical Trends
          </Link>
        </article>
      </main>
    </div>
  );
};

export default HeroSection;
