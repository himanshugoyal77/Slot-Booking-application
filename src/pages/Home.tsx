import { Users, Calendar, Shield } from "lucide-react";
import { FeatureCard } from "../components/FeatureCard";
import { CalendarStep } from "../components/CalendarStep";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigator = useNavigate();
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;

  const handleClick = () => {
    if (user) {
      navigator("/dashboard");
    } else {
      navigator("/login");
    }
  };

  return (
    <>
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[32rem] text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold tracking-wider bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Features Built for the
            <br />
            Global Workspace
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            A better and faster way to schedule across the globe.
          </p>
          <button
            onClick={handleClick}
            className="px-8 py-4 text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Get Started Free
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Users className="w-6 h-6 text-primary" />}
            title="Built For The Modern Workforce"
            description="Universal single sign-on (SSO) to secure your workspace and automate employee onboarding"
          />
          <FeatureCard
            icon={<Calendar className="w-6 h-6 text-primary" />}
            title="The Perfect Meeting"
            description="Schedule your meetings with confidence across time zones"
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="Privacy For Everyone"
            description="Enterprise-grade privacy and security built into every product"
          />
        </div>

        {/* Calendar Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="text-sm text-primary font-medium mb-2">
                How It Works
              </div>
              <h2 className="text-3xl font-bold mb-4">My Calendar</h2>
              <p className="text-gray-600">
                Sync your team's calendars and automate the scheduling process.
                Book schedules with confidence.
              </p>
            </div>
            <div className="space-y-6">
              <CalendarStep
                number={1}
                title="Sync Your Calendar"
                description="Connect your calendar to automate availability. Zonely works across all calendar platforms."
              />
              <CalendarStep
                number={2}
                title="Manage Calendars in Zonely"
                description="Add and remove calendars in Zonely to manage your entire setup in one place while maintaining optimal privacy."
              />
            </div>
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90">
              Get Started Free
            </button>
          </div>
          <div className="relative aspect-square max-w-xl mx-auto">
            <img
              src="/api/placeholder/800/800"
              alt="Calendar Interface"
              className="object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
