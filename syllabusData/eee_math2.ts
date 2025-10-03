
import type { SyllabusFile } from '../types';

export const eee_math2_syllabus: SyllabusFile = {
    name: 'Mathematics-II for EEE (BMATE201)',
    content: `
Course Title: Mathematics-II for Electrical & Electronics Engineering Stream
Course Code: BMATE201
CIE Marks: 50, SEE Marks: 50, Total Marks: 100
Course Type: Integrated
Teaching Hours/Week (L:T:P: S): 2:2:2:0, Exam Hours: 03
Total Hours of Pedagogy: 40 hours Theory + 10 to12 Lab slots, Credits: 04

Course objectives: The goal of the course Mathematics-II for Electrical & Electronics Engineering Stream (22MATE21) is to
- Familiarize the importance of Vector calculus, Vector Space and Linear transformation for electronics and electrical engineering.
- Have an insight into solving ordinary differential equations by using Laplace transform techniques.
- Develop the knowledge of solving electronics and electrical engineering problems numerically.

Module-1: Vector Calculus (8 hours)
Introduction to Vector Calculus in EC & EE engineering applications.
Vector Differentiation: Scalar and vector fields. Gradient, directional derivative, curl and divergence - physical interpretation, solenoidal and irrotational vector fields. Problems.
Vector Integration: Line integrals, Surface integrals. Applications to work done by a force and flux. Statement of Green's theorem and Stoke's theorem. Problems.
Self-Study: Volume integral and Gauss divergence theorem.
Applications: Conservation of laws, Electrostatics, Analysis of streamlines and electric potentials.

Module-2: Vector Space and Linear Transformations (8 hours)
Importance of Vector Space and Linear Transformations in the field of EC & EE engineering applications.
Vector spaces: Definition and examples, subspace, linear span, Linearly independent and dependent sets, Basis and dimension.
Linear transformations: Definition and examples, Algebra of transformations, Matrix of a linear transformation. Change of coordinates, Rank and nullity of a linear operator, Rank-Nullity theorem. Inner product spaces and orthogonality.
Self-study: Angles and Projections.Rotation, reflection, contraction and expansion.
Applications: Image processing, AI & ML, Graphs and networks, Computer graphics.

Module-3: Laplace Transform (8 hours)
Importance of Laplace Transform for EC & EE engineering applications.
Existence and Uniqueness of Laplace transform (LT), transform of elementary functions, region of convergence. Properties–Linearity, Scaling, t-shift property, s-domain shift, differentiation in the s-domain, division by t, differentiation and integration in the time domain. LT of special functions-periodic functions (square wave, saw-tooth wave, triangular wave, full & half wave rectifier), Heaviside Unit step function, Unit impulse function.
Inverse Laplace Transforms: Definition, properties, evaluation using different methods, convolution theorem (without proof), problems, and applications to solve ordinary differential equations.
Self-Study: Verification of convolution theorem.
Applications: Signals and systems, Control systems, LR, CR & LCR circuits.

Module-4: Numerical Methods -1 (8 hours)
Importance of numerical methods for discrete data in the field of EC & EE engineering applications.
Solution of algebraic and transcendental equations: Regula-Falsi method and Newton-Raphson method (only formulae). Problems.
Finite differences, Interpolation using Newton's forward and backward difference formulae, Newton's divided difference formula and Lagrange's interpolation formula (All formulae without proof). Problems.
Numerical integration: Trapezoidal, Simpson's (1/3)rd and (3/8)th rules(without proof). Problems.
Self-Study: Bisection method, Lagrange's inverse Interpolation, Weddle's rule.
Applications: Estimating the approximate roots, extremum values, area, volume, and surface area.

Module-5: Numerical Methods -2 (8 hours)
Introduction to various numerical techniques for handling EC & EE applications.
Numerical Solution of Ordinary Differential Equations (ODEs): Numerical solution of ordinary differential equations of first order and first degree - Taylor's series method, Modified Euler's method, Runge-Kutta method of fourth order and Milne's predictor-corrector formula (No derivations of formulae). Problems.
Self-Study: Adam-Bashforth method.
Applications: Estimating the approximate solutions of ODE for electric circuits.

List of Laboratory experiments (2 hours/week per batch/ batch strength 15)
1. Finding gradient, divergent, curl and their geometrical interpretation and Verification of Green's theorem
2. Computation of basis and dimension for a vector space and Graphical representation of linear transformation
3. Visualization in time and frequency domain of standard functions
4. Computing inverse Laplace transform of standard functions
5. Laplace transform of convolution of two functions
6. Solution of algebraic and transcendental equations by Regula-Falsi and Newton-Raphson method
7. Interpolation/Extrapolation using Newton's forward and backward difference formula
8. Computation of area under the curve using Trapezoidal, Simpson's (1/3)rd and (3/8)th rule
9. Solution of ODE of first order and first degree by Taylor's series and Modified Euler's method
10. Solution of ODE of first order and first degree by Runge-Kutta 4th order and Milne's predictor-corrector method
Suggested software's: Mathematica/MatLab/Python/Scilab

Course outcome (Course Skill Set):
At the end of the course the student will be able to:
CO1: Understand the applications of vector calculus refer to solenoidal, irrotational vectors, lineintegral and surface integral.
CO2: Demonstrate the idea of Linear dependence and independence of sets in the vector space, and linear transformation
CO3: To understand the concept of Laplace transform and to solve initial value problems.
CO4: Apply the knowledge of numerical methods in solving physical and engineering phenomena.
CO5: Get familiarize with modern mathematical tools namely MATHEMATICA/MATLAB/PYTHON/ SCILAB

Assessment Details (both CIE and SEE):
The weightage of Continuous Internal Evaluation (CIE) is 50% and for Semester End Exam (SEE) is 50%. Minimum passing mark for CIE is 40%, for SEE is 35%.

Continuous Internal Evaluation (CIE):
CIE for theory component is 30 marks, laboratory component is 20 Marks.
- Three Tests each of 20 Marks; after syllabus completion of 35-40%, 65-70%, and 90-100%.
- Two Assignments/quizzes/seminars etc. for 20 marks.
Total Marks (test + assignments) out of 80 scaled down to 30 marks.

Semester End Examination (SEE):
- Duration: 03 hours.
- Set for 100 marks, proportionally reduced to 50 marks.
- 10 questions total, 2 per module. Answer 5 full questions, selecting one from each module.

Suggested Learning Resources:
Text Books:
1. B. S. Grewal: “Higher Engineering Mathematics”, Khanna Publishers, 44th Ed., 2021.
2. E. Kreyszig: “Advanced Engineering Mathematics", John Wiley & Sons, 10th Ed., 2018.
Reference Books:
1. V. Ramana: “Higher Engineering Mathematics” McGraw-Hill Education, 11th Ed., 2017
2. Srimanta Pal & Subodh C.Bhunia: “Engineering Mathematics” Oxford University Press, 3rd Ed., 2016.
3. N.P Bali and Manish Goyal: “A Textbook of Engineering Mathematics" Laxmi Publications, 10th Ed., 2022.
4. C. Ray Wylie, Louis C. Barrett: “Advanced Engineering Mathematics” McGraw – Hill Book Co., New York, 6th Ed., 2017.

Web links and Video Lectures (e-Resources):
- http://nptel.ac.in/courses.php?disciplineID=111
- http://www.class-central.com/subject/math(MOOCs)
- http://academicearth.org/
- VTU e-Shikshana Program
- VTU EDUSAT Program
`
};