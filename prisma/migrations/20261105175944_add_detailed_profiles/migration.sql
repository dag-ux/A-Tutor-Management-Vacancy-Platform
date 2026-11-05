-- AlterTable
ALTER TABLE "ParentRequest" ADD COLUMN     "childAge" TEXT,
ADD COLUMN     "childName" TEXT,
ADD COLUMN     "currentPerformance" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "genderPreference" TEXT NOT NULL DEFAULT 'Any',
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'English',
ADD COLUMN     "learningStyle" TEXT,
ADD COLUMN     "mode" TEXT NOT NULL DEFAULT 'Online',
ADD COLUMN     "specificTopics" TEXT;

-- AlterTable
ALTER TABLE "TutorProfile" ADD COLUMN     "degree" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "major" TEXT,
ADD COLUMN     "university" TEXT;
