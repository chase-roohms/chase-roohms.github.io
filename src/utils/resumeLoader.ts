import yaml from 'js-yaml';
import resumeYaml from '../content/resume/resume.yaml?raw';

interface SocialNetwork {
  network: string;
  username: string;
}

interface Experience {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  location: string;
  highlights: string[];
}

interface Certification {
  bullet: string;
}

interface HonorAward {
  name: string;
  location: string;
  date: string;
  summary: string;
}

interface Education {
  institution: string;
  area: string;
  degree: string;
  start_date: string;
  end_date: string;
  location: string;
}

interface ResumeData {
  cv: {
    name: string;
    headline: string;
    location: string;
    phone: string;
    email: string;
    photo: string;
    website: string;
    social_networks: SocialNetwork[];
    sections: {
      summary: string[];
      skills: Array<{ label: string; details: string }>;
      experience: Experience[];
      honors_and_awards: HonorAward[];
      certifications: Certification[];
      education: Education[];
    };
  };
}

// Parse the YAML content
const resumeData = yaml.load(resumeYaml) as ResumeData;

// Helper function to format date ranges
function formatDateRange(startDate: string, endDate: string): string {
  const formatDate = (dateStr: string) => {
    if (dateStr === 'present') return 'Present';
    const [year, month] = dateStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };
  
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

// Export transformed data for use in components
export const getExperiences = () => {
  return resumeData.cv.sections.experience.map((exp, index) => ({
    id: resumeData.cv.sections.experience.length - index, // Reverse order for display
    title: exp.position,
    company: exp.company,
    period: formatDateRange(exp.start_date, exp.end_date),
    achievements: exp.highlights,
  }));
};

export const getCertifications = () => {
  return resumeData.cv.sections.certifications.map((cert, index) => {
    // Parse the markdown-style bullet: "**GitHub Actions** (GH-200)"
    const match = cert.bullet.match(/\*\*(.+?)\*\*\s*\((.+?)\)/);
    if (match) {
      return {
        id: resumeData.cv.sections.certifications.length - index,
        title: `${match[1]} (${match[2]})`,
        period: 'Aug 2025', // TODO: Add dates to YAML if needed
        link: '', // Links not in YAML, will need to be maintained separately or added to YAML
      };
    }
    return {
      id: index,
      title: cert.bullet.replace(/\*\*/g, ''),
      period: 'Aug 2025',
      link: '',
    };
  });
};

export const getHonorsAndAwards = () => {
  return resumeData.cv.sections.honors_and_awards.map((honor, index) => ({
    id: resumeData.cv.sections.honors_and_awards.length - index,
    title: honor.name,
    institution: honor.location,
    period: formatDate(honor.date),
    details: honor.summary,
  }));
};

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

export const getEducation = () => {
  return resumeData.cv.sections.education.map((edu, index) => ({
    id: index + 1,
    title: `${edu.degree} in ${edu.area}`,
    institution: edu.institution,
    period: formatDateRange(edu.start_date, edu.end_date),
  }));
};

export const getSummary = () => {
  return resumeData.cv.sections.summary[0];
};

export const getContactInfo = () => ({
  name: resumeData.cv.name,
  email: resumeData.cv.email,
  phone: resumeData.cv.phone,
  location: resumeData.cv.location,
  socialNetworks: resumeData.cv.social_networks,
});
