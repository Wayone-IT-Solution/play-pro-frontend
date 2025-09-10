'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

// Types based on the MongoDB schema
interface FootballRegistrationData {
    child: {
        name: string;
        dateOfBirth: string;
        enteringGrade: string;
        weight: string;
        height: string;
        tShirtSize: string;
        jerseySize: string;
        address: {
            street: string;
            city: string;
            zipCode: string;
        };
    };
    parentGuardian: {
        name: string;
        homePhone: string;
        workCellPhone: string;
        email: string;
    };
    emergencyContacts: {
        name: string;
        relationship: string;
        phone: string;
    }[];
    hospitalAuthorization: {
        preferredDoctor: string;
        doctorPhone: string;
        preferredHospital: string;
    };
    insuranceInformation: {
        insuredParent: string;
        address: string;
        insuranceCompany: string;
        policyNumber: string;
        employerNameAddress: string;
    };
    costs: {
        varsityAndJV: number;
        cheerleading: number;
        flag: number;
        selectedOption: string;
    };
    consentAcknowledgement: {
        parentGuardianSignature: string;
        date: string;
    };
    leagueInformation: {
        leagueWebsite: string;
        leagueEmail: string;
        preferredTeam: {
            varsity: boolean;
            jv: boolean;
            flag: boolean;
            cheerleading: boolean;
        };
        preferredCoach: string;
        draftOption: {
            sameTeam: boolean;
            enterIntoDraft: boolean;
        };
    };
    fundRaiser: {
        choice: string;
        amountPerBoxOrDonation: number;
        willSell: boolean;
        numberOfBoxes: number;
        initials: string;
    };
    internalUseOnly: {
        paid: boolean;
        notPaid: boolean;
        amountPaid: number;
        paymentMethod: string;
        myfRepInitials: string;
        combineNumber: string;
    };
}

interface ApiResponse {
    success: boolean;
    data?: any;
    message?: string;
    error?: string;
}

const FootballRegistrationForm: React.FC = () => {
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState<FootballRegistrationData>({
        child: {
            name: '',
            dateOfBirth: '',
            enteringGrade: '',
            weight: '',
            height: '',
            tShirtSize: 'YS',
            jerseySize: 'YS',
            address: {
                street: '',
                city: '',
                zipCode: ''
            }
        },
        parentGuardian: {
            name: '',
            homePhone: '',
            workCellPhone: '',
            email: ''
        },
        emergencyContacts: [
            { name: '', relationship: '', phone: '' },
            { name: '', relationship: '', phone: '' }
        ],
        hospitalAuthorization: {
            preferredDoctor: '',
            doctorPhone: '',
            preferredHospital: ''
        },
        insuranceInformation: {
            insuredParent: '',
            address: '',
            insuranceCompany: '',
            policyNumber: '',
            employerNameAddress: ''
        },
        costs: {
            varsityAndJV: 100,
            cheerleading: 65,
            flag: 35,
            selectedOption: ''
        },
        consentAcknowledgement: {
            parentGuardianSignature: '',
            date: ''
        },
        leagueInformation: {
            leagueWebsite: 'www.midviewyouthfootball.net',
            leagueEmail: 'myf@midviewyouthfootball.net',
            preferredTeam: {
                varsity: false,
                jv: false,
                flag: false,
                cheerleading: false
            },
            preferredCoach: '',
            draftOption: {
                sameTeam: false,
                enterIntoDraft: false
            }
        },
        fundRaiser: {
            choice: '',
            amountPerBoxOrDonation: 25,
            willSell: true,
            numberOfBoxes: 0,
            initials: ''
        },
        internalUseOnly: {
            paid: false,
            notPaid: false,
            amountPaid: 0,
            paymentMethod: '',
            myfRepInitials: '',
            combineNumber: ''
        }
    });

    // Loading and error states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string>('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Update nested form data
    const updateNestedField = useCallback((
        path: string,
        value: any
    ) => {
        setFormData(prev => {
            const keys = path.split('.');
            const newData = JSON.parse(JSON.stringify(prev));

            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                const nextKey = keys[i + 1];

                if (!isNaN(Number(nextKey))) {
                    if (!Array.isArray(current[key])) {
                        current[key] = [];
                    }
                    if (!current[key][Number(nextKey)]) {
                        current[key][Number(nextKey)] = {};
                    }
                    current = current[key][Number(nextKey)];
                    i++; // Skip the array index
                } else {
                    if (!current[key]) {
                        current[key] = {};
                    }
                    current = current[key];
                }
            }

            current[keys[keys.length - 1]] = value;
            return newData;
        });
    }, []);

    // Handle emergency contact changes
    const updateEmergencyContact = useCallback((index: number, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            emergencyContacts: prev.emergencyContacts.map((contact, i) =>
                i === index ? { ...contact, [field]: value } : contact
            )
        }));
    }, []);

    // API call function
    const submitRegistration = async (data: FootballRegistrationData): Promise<ApiResponse> => {
        try {
            const response = await fetch('/api/football-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to submit registration');
            }

            return { success: true, data: result.data, message: result.message };
        } catch (error) {
            console.error('Registration submission error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    };

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            // Basic validation
            if (!formData.child.name || !formData.child.dateOfBirth || !formData.parentGuardian.name) {
                throw new Error('Please fill in all required fields');
            }

            const result = await submitRegistration(formData);

            if (result.success) {
                setSubmitSuccess(true);
                // Optional: Reset form or redirect
                // router.push('/registration-success');
            } else {
                setSubmitError(result.error || 'Failed to submit registration');
            }
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl pt-28 mx-auto p-6 bg-white">
            {/* Header */}
            <div className="text-center mb-8 border-2 border-black">
                <h1 className="text-xl font-bold py-4">Midview Youth Football Registration Form</h1>
                <div className="text-sm border-t border-black px-4 py-2">
                    <p>Please Print Information: Child's Weight: _____ Height: _____ T-Shirt Size: _____ (adult/youth)</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Child Information */}
                <div className="border border-black">
                    <div className="bg-gray-100 px-4 py-2 border-b border-black">
                        <h2 className="font-bold">CHILD INFORMATION</h2>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name: <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={formData.child.name}
                                    onChange={(e) => updateNestedField('child.name', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date of Birth: <span className="text-red-500">*</span></label>
                                    <input
                                        type="date"
                                        value={formData.child.dateOfBirth}
                                        onChange={(e) => updateNestedField('child.dateOfBirth', e.target.value)}
                                        className="w-full border-b border-black outline-none bg-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Est Entering Grade:</label>
                                    <input
                                        type="text"
                                        value={formData.child.enteringGrade}
                                        onChange={(e) => updateNestedField('child.enteringGrade', e.target.value)}
                                        className="w-full border-b border-black outline-none bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Weight:</label>
                                <input
                                    type="text"
                                    value={formData.child.weight}
                                    onChange={(e) => updateNestedField('child.weight', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Height:</label>
                                <input
                                    type="text"
                                    value={formData.child.height}
                                    onChange={(e) => updateNestedField('child.height', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Zip Code:</label>
                                <input
                                    type="text"
                                    value={formData.child.address.zipCode}
                                    onChange={(e) => updateNestedField('child.address.zipCode', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Parent/Guardian Name: <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={formData.parentGuardian.name}
                                    onChange={(e) => updateNestedField('parentGuardian.name', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">City:</label>
                                <input
                                    type="text"
                                    value={formData.child.address.city}
                                    onChange={(e) => updateNestedField('child.address.city', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Home Phone:</label>
                                <input
                                    type="tel"
                                    value={formData.parentGuardian.homePhone}
                                    onChange={(e) => updateNestedField('parentGuardian.homePhone', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Work/Cell Phone:</label>
                                <input
                                    type="tel"
                                    value={formData.parentGuardian.workCellPhone}
                                    onChange={(e) => updateNestedField('parentGuardian.workCellPhone', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email:</label>
                                <input
                                    type="email"
                                    value={formData.parentGuardian.email}
                                    onChange={(e) => updateNestedField('parentGuardian.email', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Address:</label>
                            <input
                                type="text"
                                value={formData.child.address.street}
                                onChange={(e) => updateNestedField('child.address.street', e.target.value)}
                                className="w-full border-b border-black outline-none bg-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Emergency Contacts */}
                <div className="border border-black">
                    <div className="bg-red-100 px-4 py-2 border-b border-black">
                        <h2 className="font-bold">**IN CASE OF EMERGENCY PLEASE CONTACT:</h2>
                    </div>
                    <div className="p-4 space-y-4">
                        {formData.emergencyContacts.map((contact, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name:</label>
                                    <input
                                        type="text"
                                        value={contact.name}
                                        onChange={(e) => updateEmergencyContact(index, 'name', e.target.value)}
                                        className="w-full border-b border-black outline-none bg-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Relationship:</label>
                                    <input
                                        type="text"
                                        value={contact.relationship}
                                        onChange={(e) => updateEmergencyContact(index, 'relationship', e.target.value)}
                                        className="w-full border-b border-black outline-none bg-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone:</label>
                                    <input
                                        type="tel"
                                        value={contact.phone}
                                        onChange={(e) => updateEmergencyContact(index, 'phone', e.target.value)}
                                        className="w-full border-b border-black outline-none bg-transparent"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hospital Authorization */}
                <div className="border border-black">
                    <div className="bg-gray-100 px-4 py-2 border-b border-black">
                        <h2 className="font-bold">HOSPITAL AUTHORIZATION:</h2>
                        <p className="text-xs">Should it be necessary, the coaches and officials with have the authority to arrange for medical treatment for my child in case of injury. I prefer my child to be treated by:</p>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Doctor:</label>
                                <input
                                    type="text"
                                    value={formData.hospitalAuthorization.preferredDoctor}
                                    onChange={(e) => updateNestedField('hospitalAuthorization.preferredDoctor', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone:</label>
                                <input
                                    type="tel"
                                    value={formData.hospitalAuthorization.doctorPhone}
                                    onChange={(e) => updateNestedField('hospitalAuthorization.doctorPhone', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Preferred Hospital:</label>
                                <input
                                    type="text"
                                    value={formData.hospitalAuthorization.preferredHospital}
                                    onChange={(e) => updateNestedField('hospitalAuthorization.preferredHospital', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Insurance Information */}
                <div className="border border-black">
                    <div className="bg-gray-100 px-4 py-2 border-b border-black">
                        <h2 className="font-bold">INSURANCE INFORMATION:</h2>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Insured Parent:</label>
                                <input
                                    type="text"
                                    value={formData.insuranceInformation.insuredParent}
                                    onChange={(e) => updateNestedField('insuranceInformation.insuredParent', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Address:</label>
                                <input
                                    type="text"
                                    value={formData.insuranceInformation.address}
                                    onChange={(e) => updateNestedField('insuranceInformation.address', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Insurance Company:</label>
                                <input
                                    type="text"
                                    value={formData.insuranceInformation.insuranceCompany}
                                    onChange={(e) => updateNestedField('insuranceInformation.insuranceCompany', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Policy #:</label>
                                <input
                                    type="text"
                                    value={formData.insuranceInformation.policyNumber}
                                    onChange={(e) => updateNestedField('insuranceInformation.policyNumber', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Employer's Name/Address:</label>
                            <input
                                type="text"
                                value={formData.insuranceInformation.employerNameAddress}
                                onChange={(e) => updateNestedField('insuranceInformation.employerNameAddress', e.target.value)}
                                className="w-full border-b border-black outline-none bg-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Costs Section */}
                <div className="border border-black">
                    <div className="bg-yellow-100 px-4 py-2 border-b border-black">
                        <h2 className="font-bold">COSTS:</h2>
                        <p className="text-xs">Varsity/JV: $100.00 | Cheerleading: $65.00 | Flag: $35.00</p>
                        <p className="text-xs">These are the costs for this football season. Check all that applies.</p>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.costs.selectedOption === 'varsityJV'}
                                    onChange={(e) => updateNestedField('costs.selectedOption', e.target.checked ? 'varsityJV' : '')}
                                    className="mr-2"
                                />
                                <span>Varsity/JV - $100.00</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.costs.selectedOption === 'cheerleading'}
                                    onChange={(e) => updateNestedField('costs.selectedOption', e.target.checked ? 'cheerleading' : '')}
                                    className="mr-2"
                                />
                                <span>Cheerleading - $65.00</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.costs.selectedOption === 'flag'}
                                    onChange={(e) => updateNestedField('costs.selectedOption', e.target.checked ? 'flag' : '')}
                                    className="mr-2"
                                />
                                <span>Flag - $35.00</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* League Information */}
                <div className="border border-black">
                    <div className="bg-blue-100 px-4 py-2 border-b border-black">
                        <h2 className="font-bold">LEAGUE INFORMATION:</h2>
                        <p className="text-xs">Website: www.midviewyouthfootball.net | Email: myf@midviewyouthfootball.net</p>
                    </div>
                    <div className="p-4 space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Preferred Team:</h3>
                            <div className="grid grid-cols-4 gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.leagueInformation.preferredTeam.varsity}
                                        onChange={(e) => updateNestedField('leagueInformation.preferredTeam.varsity', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span>Varsity</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.leagueInformation.preferredTeam.jv}
                                        onChange={(e) => updateNestedField('leagueInformation.preferredTeam.jv', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span>JV</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.leagueInformation.preferredTeam.flag}
                                        onChange={(e) => updateNestedField('leagueInformation.preferredTeam.flag', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span>Flag</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.leagueInformation.preferredTeam.cheerleading}
                                        onChange={(e) => updateNestedField('leagueInformation.preferredTeam.cheerleading', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span>Cheerleading</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Preferred Coach:</label>
                            <input
                                type="text"
                                value={formData.leagueInformation.preferredCoach}
                                onChange={(e) => updateNestedField('leagueInformation.preferredCoach', e.target.value)}
                                className="w-full border-b border-black outline-none bg-transparent"
                            />
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Draft Option:</h3>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="draftOption"
                                        checked={formData.leagueInformation.draftOption.sameTeam}
                                        onChange={(e) => {
                                            updateNestedField('leagueInformation.draftOption.sameTeam', true);
                                            updateNestedField('leagueInformation.draftOption.enterIntoDraft', false);
                                        }}
                                        className="mr-2"
                                    />
                                    <span>Keep on same team</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="draftOption"
                                        checked={formData.leagueInformation.draftOption.enterIntoDraft}
                                        onChange={(e) => {
                                            updateNestedField('leagueInformation.draftOption.enterIntoDraft', true);
                                            updateNestedField('leagueInformation.draftOption.sameTeam', false);
                                        }}
                                        className="mr-2"
                                    />
                                    <span>Enter into the Draft</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fund Raiser */}
                <div className="border border-black">
                    <div className="bg-green-100 px-4 py-2 border-b border-black">
                        <h2 className="font-bold">MYF Fund Raiser</h2>
                        <p className="text-xs">I will/will not be selling <u>cheese</u>, I will choose to either sell at least one box of candy or pay $25.00 in lieu of participating.</p>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Choice:</label>
                                <select
                                    value={formData.fundRaiser.choice}
                                    onChange={(e) => updateNestedField('fundRaiser.choice', e.target.value)}
                                    className="w-full border border-black outline-none bg-transparent p-1"
                                >
                                    <option value="">Select...</option>
                                    <option value="sell">I will sell candy</option>
                                    <option value="pay">I will pay $25</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Number of Boxes:</label>
                                <input
                                    type="number"
                                    value={formData.fundRaiser.numberOfBoxes}
                                    onChange={(e) => updateNestedField('fundRaiser.numberOfBoxes', parseInt(e.target.value) || 0)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Initials:</label>
                            <input
                                type="text"
                                value={formData.fundRaiser.initials}
                                onChange={(e) => updateNestedField('fundRaiser.initials', e.target.value)}
                                className="w-full border-b border-black outline-none bg-transparent"
                                maxLength={3}
                            />
                        </div>
                    </div>
                </div>

                {/* Consent and Signature */}
                <div className="border border-black">
                    <div className="bg-gray-100 px-4 py-2 border-b border-black">
                        <h2 className="font-bold">CONSENT AND ACKNOWLEDGEMENT</h2>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="text-sm">
                            <p className="mb-4">
                                We request to our child a participant in the Midview Youth Football program. By completing and submitting this child to participate
                                in any organized tackle football or flag football activities of Midview Youth Football activities. We will not hold you or any of your
                                assistants responsible for any injury to our child.
                            </p>
                            <p className="mb-4 font-bold">
                                **NO CHILD CAN PRACTICE/PLAY FOOTBALL WITHOUT AN UPDATED PHYSICAL ON FILE WITH THE LEAGUE.**
                            </p>
                            <p className="mb-4 font-bold">
                                **NO CHILD CAN PRACTICE/PLAY FOOTBALL WITHOUT AN UPDATED PHYSICAL ON FILE WITH THE LEAGUE.**
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Parent/Guardian Signature: <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={formData.consentAcknowledgement.parentGuardianSignature}
                                    onChange={(e) => updateNestedField('consentAcknowledgement.parentGuardianSignature', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date: <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    value={formData.consentAcknowledgement.date}
                                    onChange={(e) => updateNestedField('consentAcknowledgement.date', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Internal Use Only */}
                <div className="border border-black">
                    <div className="bg-red-200 px-4 py-2 border-b border-black">
                        <h2 className="font-bold">For Internal Use Only</h2>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.internalUseOnly.paid}
                                        onChange={(e) => updateNestedField('internalUseOnly.paid', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span>☐ Paid ☐ Not Paid</span>
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Amount:</label>
                                <input
                                    type="number"
                                    value={formData.internalUseOnly.amountPaid}
                                    onChange={(e) => updateNestedField('internalUseOnly.amountPaid', parseFloat(e.target.value) || 0)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Payment Method:</label>
                                <select
                                    value={formData.internalUseOnly.paymentMethod}
                                    onChange={(e) => updateNestedField('internalUseOnly.paymentMethod', e.target.value)}
                                    className="w-full border border-black outline-none bg-transparent p-1"
                                >
                                    <option value="">Select...</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Check">Check</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">MYF Rep Initials:</label>
                                <input
                                    type="text"
                                    value={formData.internalUseOnly.myfRepInitials}
                                    onChange={(e) => updateNestedField('internalUseOnly.myfRepInitials', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                    maxLength={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Combine #:</label>
                                <input
                                    type="text"
                                    value={formData.internalUseOnly.combineNumber}
                                    onChange={(e) => updateNestedField('internalUseOnly.combineNumber', e.target.value)}
                                    className="w-full border-b border-black outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error and Success Messages */}
                {submitError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{submitError}</span>
                    </div>
                )}

                {submitSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        <strong className="font-bold">Success: </strong>
                        <span className="block sm:inline">Registration submitted successfully!</span>
                    </div>
                )}

                {/* Submit Button */}
                <div className="text-center pt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-8 py-3 text-white font-bold rounded-lg shadow-lg transform transition-all duration-200 ${isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </span>
                        ) : (
                            'Submit Registration'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FootballRegistrationForm;