import Election from '../models/Election.js';

// @desc    Get election timeline
// @route   GET /api/election/timeline
// @access  Public
export const getTimeline = async (req, res) => {
    try {
        const timeline = await Election.find().sort({ order: 1 });
        res.json({
            success: true,
            count: timeline.length,
            data: timeline
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Seed sample election data
// @route   POST /api/election/seed
// @access  Private (should be admin)
export const seedData = async (req, res) => {
    try {
        const sampleData = [
            {
                stage: 'Voter Registration',
                title: 'Update or Register as a Voter',
                description: 'Ensure your name is in the voter list. You can apply online via NVSP portal.',
                order: 1,
                status: 'Ongoing'
            },
            {
                stage: 'Candidate Nomination',
                title: 'Filing Nominations',
                description: 'Candidates file their papers with the Returning Officer.',
                order: 2,
                status: 'Upcoming'
            },
            {
                stage: 'Campaigning',
                title: 'Public Meetings & Rallies',
                description: 'Political parties and candidates reach out to voters.',
                order: 3,
                status: 'Upcoming'
            },
            {
                stage: 'Voting Day',
                title: 'Cast Your Vote',
                description: 'Go to your assigned polling station and cast your valuable vote.',
                order: 4,
                status: 'Upcoming'
            },
            {
                stage: 'Counting & Results',
                title: 'Counting of Votes',
                description: 'Votes are counted and winners are announced.',
                order: 5,
                status: 'Upcoming'
            }
        ];

        await Election.deleteMany();
        const createdData = await Election.insertMany(sampleData);

        res.status(201).json({
            success: true,
            message: 'Sample data seeded successfully',
            data: createdData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
