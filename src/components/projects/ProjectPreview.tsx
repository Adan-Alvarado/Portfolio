import type { Project } from '../../types/portfolio';
import type { LocalizedPortfolioContent } from '../../i18n/content';

interface ProjectPreviewProps {
	project: Project;
	copy: LocalizedPortfolioContent['projects']['preview'];
	expanded?: boolean;
}

export default function ProjectPreview({ project, copy, expanded = false }: ProjectPreviewProps) {
	if (project.preview === 'auto-care') {
		return (
			<div className={`pg-preview pg-preview--auto${expanded ? ' is-expanded' : ''}`} aria-hidden="true">
				<span className="pg-demo-label">{copy.conceptDemo}</span>
				<div className="pg-auto-window">
					<div className="pg-window-bar"><i></i><i></i><i></i><span>autocare.local</span></div>
					<div className="pg-auto-nav"><b>AUTO CARE</b><span>{copy.overview}&nbsp;&nbsp; {copy.services}&nbsp;&nbsp; {copy.history}</span></div>
					<div className="pg-auto-layout">
						<div className="pg-auto-copy">
							<small>{copy.nextService}</small>
							<strong>{copy.autoHeadline[0]}<br />{copy.autoHeadline[1]}</strong>
							<span>{copy.maintenance}</span>
						</div>
						<div className="pg-car-shape"><i></i><i></i></div>
					</div>
					<div className="pg-auto-stats"><span><b>04</b> {copy.services}</span><span><b>82%</b> {copy.generalStatus}</span><span><b>12k</b> {copy.kilometers}</span></div>
				</div>
			</div>
		);
	}

	if (project.preview === 'diseno') {
		return (
			<div className={`pg-preview pg-preview--design${expanded ? ' is-expanded' : ''}`} aria-hidden="true">
				<span className="pg-demo-label">{copy.conceptSample}</span>
				<div className="pg-poster pg-poster--one"><small>IDENTIDAD / 01</small><b>CASA<br />NÓMADA</b><i></i></div>
				<div className="pg-poster pg-poster--two"><small>CAMPAÑA / 02</small><b>FRUTA<br />24</b><span>FRESCO · LOCAL · DIARIO</span></div>
				<div className="pg-poster pg-poster--three"><small>EDITORIAL / 03</small><b>RITMO</b><i></i><span>VOL. 08</span></div>
			</div>
		);
	}

	return (
		<div className={`pg-preview pg-preview--fixit${expanded ? ' is-expanded' : ''}`} aria-hidden="true">
			<span className="pg-demo-label">{copy.fictionalApi}</span>
			<div className="pg-api-window">
				<div className="pg-api-sidebar"><b>FIXIT / API</b><span>Overview</span><span className="is-active">Tickets</span><span>Assignments</span><span>Users</span></div>
				<div className="pg-api-main">
					<small>{copy.endpoint}</small>
					<strong><i>POST</i> /v1/tickets</strong>
					<pre>{`{\n  "status": "open",\n  "priority": "medium"\n}`}</pre>
					<span><i>201</i> {copy.ticketCreated}</span>
				</div>
			</div>
		</div>
	);
}
